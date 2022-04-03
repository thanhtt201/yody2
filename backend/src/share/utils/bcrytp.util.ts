import * as bcrytp from 'bcrypt'

// mã hóa mật khẩu
export const encryptPassword = (password: string) => {
    const hash = bcrytp.hashSync(password, 12)
    return hash
}

export const isPasswordMatch = (password: string, hash: string) => {
    const isMatch = bcrytp.compareSync(password, hash)
    return isMatch
}