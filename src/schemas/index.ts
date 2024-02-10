import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string().length(6))
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
})

export const NewPasswordSchema = z.object({
    token: z.string({
        required_error: "Token required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    })
})

export const ResetPasswordSchema = LoginSchema.omit({password: true, code: true});


export const GameUpdateSchema = z.object({
    id: z.string().min(1,{
        message: "Id is missing",
    }),
    name: z.string({
        required_error: "Name is required"
    }),
    price: z.coerce.number().gt(0, { message: 'Please, enter a price greater then 0'}),
    description: z.string({
        required_error: "Description is required"
    }),
    image: z.instanceof(File)
        .refine((file) => file instanceof File, `Only files allowed`)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    genresId: z
        .array(z.string(), {invalid_type_error: "Invalid genres"})
        .nonempty({message: "Choose at least one genre"
    }),
    tagsId: z.array(z.string(), {
        invalid_type_error: "Invalid tags"
    })
})

export const UpdateGameIsActiveSchema = z.object({
    id: z.string().min(1,{
        message: "Id is missing",
    }),
    isActive: z.string().toLowerCase().transform((x) => x === 'true').pipe(z.boolean())
})


export const GameCreateSchema = GameUpdateSchema.omit({id: true});
