const { execSync } = require("child_process");

const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID;

if (!SUPABASE_PROJECT_ID) {
  console.error(
    "SUPABASE_PROJECT_ID is not defined in the environment variables."
  );
  process.exit(1);
}

execSync(
  `npx supabase gen types typescript --project-id ${SUPABASE_PROJECT_ID} > lib/database.types.ts`,
  { stdio: "inherit" }
);
