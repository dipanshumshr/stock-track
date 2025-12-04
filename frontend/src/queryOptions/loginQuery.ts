import { mutationOptions } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";

export const createLoginQuery = mutationOptions({
    mutationFn : loginUser,
})