import { AppDataSource } from "../config/data-source";

export async function ensureProcedures() {
  const q = (s: string) => AppDataSource.manager.query(s);

  await q(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  await q(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  await q(`
    CREATE OR REPLACE FUNCTION public.sp_create_post(p_user_id uuid, p_message text)
    RETURNS TABLE(id uuid, user_id uuid, message text, created_at timestamptz)
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      INSERT INTO public.posts AS p (id, user_id, message, created_at)
      VALUES (gen_random_uuid(), p_user_id, p_message, now())
      RETURNING p.id, p.user_id, p.message, p.created_at;
    END;
    $$;
  `);

  await q(`
    CREATE OR REPLACE FUNCTION public.sp_increment_like(p_post_id uuid, p_user_id uuid)
    RETURNS integer
    LANGUAGE plpgsql
    AS $$
    DECLARE v_count integer;
    BEGIN
      BEGIN
        INSERT INTO public.likes(id, post_id, user_id, created_at)
        VALUES (gen_random_uuid(), p_post_id, p_user_id, now());
      EXCEPTION WHEN unique_violation THEN
        DELETE FROM public.likes WHERE post_id = p_post_id AND user_id = p_user_id;
      END;
      SELECT COUNT(*) INTO v_count FROM public.likes WHERE post_id = p_post_id;
      RETURN v_count;
    END;
    $$;
  `);
}
