import { Database } from "@/lib/database.types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDetailLesson = async (
  id: number,
  supabase: SupabaseClient<Database>
) => {
  const { data: lesson } = await supabase
    .from("video")
    .select("*")
    .eq("id", id)
    .single();
  return lesson;
};

const LessonDetailPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const lesson = await getDetailLesson(params.id, supabase);

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{lesson?.title}</h1>
      <p className="mb-8">{lesson?.description}</p>
    </div>
  );
};

export default LessonDetailPage;
