import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabaseServer";
import { Database } from "@/lib/database.types";

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
  const { data: lessons } = await supabase.from("video").select("*");
  return lessons;
};

export default async function Home() {
  const supabase = supabaseServer();
  const lessons = await getAllLessons(supabase);

  return (
    <main className="w-full max-w-3xl mx-auto my-16">
      <div className="flex flex-col gap-3">
        {lessons?.map((lesson) => (
          <Link href={`/${lesson.id}`} key={lesson.id}>
            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap break-words">
                  {lesson.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
