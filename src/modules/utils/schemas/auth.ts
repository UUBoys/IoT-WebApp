import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export const signUpSchema = z
  .object({
    email: z.string().min(1, { message: "Toto pole je povinné" }).email({
      message: "Není validní emailová adresa",
    }),
    username: z
      .string()
      .min(3, { message: "Minimální délka křestního jména jsou 3 znaky" })
      .max(32, { message: "Maximální délka je 32 znaků" }),
    password: z
      .string()
      .min(5, { message: "Heslo musí mít minimálně 5 znaků" })
      .max(64, { message: "Heslo můře mít maximálně 64 znaků" }),
    passwordCheck: z.string().min(1, { message: "Toto pole je povinné" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["confirmPassword"],
    message: "Hesla se neshodují",
  });

export type IRegister = z.infer<typeof signUpSchema>;

export type ILogin = z.infer<typeof signInSchema>;
