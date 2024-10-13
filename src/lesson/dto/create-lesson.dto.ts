export class CreateLessonDto {
  name: string;
  video_link: string;
  difficulty: 'oson' | "o'rta" | 'qiyin';
  subcategories: [number];
}
