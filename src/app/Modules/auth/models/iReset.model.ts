export interface IReset{
    email: string,
    seed: string,
    password: string,
    confirmPassword: string
}

export interface IResetResponse {
  message: string;
}
