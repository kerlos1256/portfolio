import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

export interface Project {
  title: string;
  description: string;
  details?: string;
  impact?: string;
  tags: string[];
  images?: string[];
  url?: string;
  github?: string;
  year: number;
  order?: number;
}

export async function GET() {
  try {
    const dir = join(process.cwd(), "projects");
    const files = await readdir(dir);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const projects: Project[] = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await readFile(join(dir, file), "utf-8");
        return JSON.parse(raw) as Project;
      })
    );

    projects.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return b.year - a.year;
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
