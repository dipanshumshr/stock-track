
type UserCreds = {
    username : string,
    password : string
} 



export const loginUser = async (Credential : UserCreds) => {
    const response = await fetch('api/auth/login' ,{
        method : "POST",
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(Credential)
    })

    if(!response.ok)
    {
        const errorMsg = await response.json()
        throw new Error(errorMsg.message || 'Invalid Username and Password')
    }

    return response.json()
}