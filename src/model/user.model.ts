// Using typegoose
import {getModelForClass, modelOptions, prop, Severity, pre} from "@typegoose/typegoose"
import { nanoid } from "nanoid"
import argon2 from "argon2"
import logger from "../utils/logger.utils"

@pre<User>("save", async function() {
    if(!this.isModified('password')){
        return
    }

    const hash = await argon2.hash(this.password)

    this.password = hash
    return 
})

@modelOptions({
    schemaOptions:{
        timestamps:true
    },
    options:{
        allowMixed: Severity.ALLOW
    }
})


export class User {
    @prop({lowercase: true, required: true, unique: true})
    email: string

    @prop({required: true})
    firstName: string

    @prop({required: true})
    lastName: string

    @prop({required: true})
    password: string

    @prop({required: true, default: () => nanoid})
    verficationCode: string

    @prop({})
    passwordReset: string | null

    @prop({default: false})
    verified: boolean

   async validatePassword(this: DocumentType<User>, candidatePassword:string){
       try{
            return await argon2.verify(this.password, candidatePassword)
        }
        catch(e){
            logger.error(e, "Could not verify this password ")
            return false
        }
    }
       
}

const userModel = getModelForClass(User)

export default userModel