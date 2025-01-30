import { createRouter } from "../context";

export const taskRouter = createRouter()
  .query("getTasks", {
    resolve: async ({ ctx }) => {
      return ctx.prisma.task.findMany();
    },
  })
  .mutation("createTask", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      deadline: z.date(),
      priority: z.string(),
      status: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: input,
      });
    },
  });
