const {Student} = require('../models')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')


exports.addStudent = async (req, res)=>{
    try {
        const { fullName, email, phone } = req.body
        const file = req.file

        const studentExist = await Student.findOne({where: {email}})
        if(studentExist){
            fs.unlinkSync(file.path)
            return res.status(404).json({
                message: `Student already exist!`
            })
        }

        const result = await cloudinary.uploader.upload(file.path)


        const data = {
            fullName,
            email,
            phone,
            profilePicture: {
                imagePath: result.secure_url,
                imageId: result.public_id
            }
        }

        await Student.create(data)

        fs.unlinkSync(file.path);

        res.status(201).json({
            message: `Student added successfully!`,
            data
        })
    } catch (error) {
        if(error){
            if(req.file){
                fs.unlinkSync(req.file.path)
            }
        }
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllStudents = async (req, res)=>{
    try {
        const students = await Student.findAll()
        res.status(200).json({
            message: `All students found successfully and total students is: ${students.length}`,
            data: students
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateStudent = async (req, res)=>{
    try {
        const {id} = req.params
        const {fullName, email, phone} = req.body
        const file = req.file
        const student = await Student.findByPk(id)


        if(!student){
            if(file){
                fs.unlinkSync(file.path)
            }
            return res.status(404).json({
                message: `Student not found!`
            })
        }

        const data = {
            fullName,
            email,
            phone
        }


        if(file){
            await cloudinary.uploader.destroy(student.profilePicture.imageId)
            const result = await cloudinary.uploader.upload(file.path)
//1 method
            data.profilePicture.imageId = result.public_id
            data.profilePicture.imagePath = result.secure_url
// //2 method
//             const data = {
//                 imagePath: result.secure_url,
//                 imageId: result.public_id
//             }
//             data.profilePicture = data
// //3 method
//             data.profilePicture = {
//                 imagePath: result.secure_url,
//                 imageId: result.public_id
//             }
}

         const updatedStudent = await student.update(data)
             res.status(200).json({
                message: `Student updated successfully!`,
                data: updatedStudent
                })

                fs.unlinkSync(file.path)

     }catch (error) {
        if(error){
            if(req.file){
                fs.unlinkSync(req.file.path)
            }
        res.status(500).json({
            message: error.message
        })
    }
}    
}