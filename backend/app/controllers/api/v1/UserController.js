
const { User } = require("../../../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SIGNATURE_KEY, REFRESH_TOKEN } = require("../../../../config/application.js");
const userService = require("../../../services/userService");
const nodemailer = require("nodemailer")
// const isi = require("../../../../../index.html")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'diorypribadi@gmail.com',
        // pass: 'powexrwoffzenaml'
        user: 'dioripribadisinaga@gmail.com',
        pass: 'ttoocznyleaizfhs'
    }
});


class UserController {
    handleListUser = async (req, res) => {
        try {
            await User.findAll().then((users) => {
                res.json(users)
            })
            // const users = await userService.list()
            // res.json(users)
            // await userService.list().then((users)=>{
            //     res.json(users)
            // })
        } catch (error) {
            console.error(error)
        }
    }

    handleGetUser = async (req, res) => {
        userService.find(req.params.id).then((user) => {
            if (user == null) {
                res.send('Data Kosong')
            } else {
                res.json(user)
            }
        })
    }
    handleGetUserNama = async (req, res) => {
        User.findOne({
            where: { email: req.params.email }
        }).then((user) => {
            if (user == null) {
                res.send('Data Kosong')
            } else {
                res.json(user)
            }
        })
    }

    handleLogin = async (req, res) => {
        try {
            const password = req.body.password;
            const email = req.body.email
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (email.length == 0) return res.status(404).json({ msg: "Email Kosong" })
            if (!user) {
                res.status(404).json({ msg: "Email Tidak Ditemukan" });
                return;
            }
            if (password.length == 0) return res.status(404).json({ msg: "Password Kosong" })
            const isPasswordCorrect = this.verifyPassword(password, user.password);

            if (!isPasswordCorrect) {
                console.log("Password Salah");
                res.status(401).json({ msg: "Password Salah" });
                return;
            }

            const accessToken = this.createTokenFromUser(user);
            const refreshToken = this.createRefreshToken(user)
            // res.cookie("refreshToken",refreshToken,{
            //     httpOnly:true,
            //     maxAge :24*60*60000
            // })
            await User.update({
                refresh_token: refreshToken
            }, {
                where: { id: user.id }
            })
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60000,
                secure: true
            })

            res.status(201).json({
                id: user.id,
                nama: user.nama,
                email: user.email,
                accessToken,
                verifikasi: user.verifikasi
            })
        } catch (error) {
            res.status(404).json(error)
        }
    }

    Random = () => {
        return Math.floor(Math.random() * 4000) + 1000;
    }
    handleCreateUser = async (req, res) => {
        try {
            const { nama, email, password, confpassword } = req.body

            let user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (email.length == 0) return res.status(403).json({ msg: "Email tidak boleh kosong" })
            if (user) {
                res.status(422).json({ msg: "Maaf Email Sudah Terdaftar " })
                return
            }

            if (password !== confpassword) return res.status(403).json({ msg: "Password dan Confirm Password Tidak Sama" })
            const link = "http://localhost:3000"
            const random = this.Random()
            const contentEmail = `
            <h1>Hai <span style="color:red">${req.body.nama}<span/>,</h1>
            <h4>Verifikasi Email mu!</h4>
            <h3> Berikut OTP nya <span style="color:blue">${random}<span/><h3/>
            <p>Terima Kasih<p/>
            `
            const mailOptions = {
                from: "Diory Pribadi",
                to: `${req.body.email}`,
                subject: "Verifikasi Email(SecondHand)",
                // text:`Selamat Datang <h1>${req.body.nama}`,
                html: contentEmail
            };
            transporter.sendMail(mailOptions, (err, info) => {
                console.log('Email sent: ' + info.response);
            })
            if (link == null) return res.status(403).json({ msg: "Gagal" })
            await userService.create({
                nama: nama,
                email: email,
                password: this.encryptPassword(password),
                OTP: random
            })
            res.json({ msg: "Register Berhasil" })
        } catch (error) {
            console.error(error)
        }
    }

    handleKonfirmasiRegister = (req, res, user) => {
        const contentEmail = `
        <h1>Selamat <span style="color:red">${user.nama}<span/>,</h1>
        <h4>Registrasi Berhasil!</h4>
        <p>Terima Kasih<p/>
        `
        const mailOptions = {
            from: "Diory Pribadi",
            to: `${user.email}`,
            subject: "Registrasi Berhasil(SecondHand)",
            // text:`Selamat Datang <h1>${req.body.nama}`,
            html: contentEmail
        };
        transporter.sendMail(mailOptions, (err, info) => {
            console.log('Email sent: ' + info.response);
        })
    }

    handleUpdateuser = async (req, res) => {
        try {
            const { nama, kota, alamat, nomor_hp, image, verifikasi } = req.body

            const ada = await userService.find(req.params.id)
            if (ada == null) {
                res.status(404).json({ msg: "Data Tidak Ada" })
                return
            }
            await userService.update({
                nama: nama,
                kota: kota,
                alamat: alamat,
                nomor_hp: nomor_hp,
                image: image,
                verifikasi: verifikasi
            }, req.params.id)
            res.json({ msg: "Berhasil di Updated" })
        } catch (error) {
            console.log(error)
            res.json({ msg: error })
        }
    }

    handleDeleteUser = async (req, res) => {
        try {
            // let ada = await User.findOne({
            //     where:{id: req.params.id}
            // })
            let ada = await userService.find(req.params.id)
            if (ada) {
                await User.destroy({
                    where: { id: req.params.id }
                })
                // await userService.delete(req.param.id)
                res.json({ msg: "Berhasil Dihapus" })
                return
            }
            res.json({ msg: "Tidak Ditemukan" })
        } catch (error) {
            res.json("Data Tidak Ditemukan")
        }
    }
    createTokenFromUser = (user) => {
        return jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, JWT_SIGNATURE_KEY,
            { expiresIn: "40s" }
        )
    }

    createRefreshToken = (user) => {
        return jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, JWT_SIGNATURE_KEY,
            { expiresIn: "1d" }
        )
    }
    refreshToken = async (req, res) => {
        try {
            const refreshToken = (req.cookies.refreshToken);
            // return res.json({msg:refreshToken})
            if (!refreshToken) return res.sendStatus(401)
            const user = await User.findOne({
                where: {
                    refresh_token: refreshToken
                }
            })
            if (!user) return res.sendStatus(403)
            jwt.verify(refreshToken, JWT_SIGNATURE_KEY, (err, decode) => {
                if (err) return res.sendStatus(403)
                const accessToken = this.createTokenFromUser(user)
                res.json({ accessToken })
            })
        } catch (error) {
            console.log(error)
        }
    }
    decodeToken(token) {
        return jwt.verify(token, JWT_SIGNATURE_KEY);
    }

    encryptPassword = (password) => {
        return bcrypt.hashSync(password, 10);
    }

    verifyPassword = (password, encryptedPassword) => {
        return bcrypt.compareSync(password, encryptedPassword)
    }

    async whoAmI(req, res) {
        req.user
        res.status(200).json(req.user);
        return req.user
    }

    authorize = async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split("Bearer ")[1];
            const payload = this.decodeToken(token)
            req.user = await User.findByPk(payload.id);
            console.log(payload);
            next();
            // if(token == null) return res.sendStatus(401)
            // jwt.verify(token,JWT_SIGNATURE_KEY,(err,decoded)=>{
            //     if(err) return res.sendStatus(403)
            //     req.email = decoded.email
            //     next()
            // })
        }
        catch (err) {
            res.status(401).json({
                error: {
                    name: err.name,
                    message: err.message,
                    details: err.details || null,
                }
            })
        }
        // const authHeader =  req.headers.authorization
        // const token = authHeader.split("Bearer ")[1]
        // // const token = req.headers.authorization?.split(" ")[1];
        // if(token==null) return res.sendStatus(403)
        // jwt.verify(token,JWT_SIGNATURE_KEY,(err,decoded)=>{
        //     if(err) return res.sendStatus(403)
        //     req.email = decoded.email
        //     next()
        // })
    }

    verifyToken = (req, res, next) => {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        // const token = req.headers.authorization?.split(" ")[1];
        if (token == null) return res.sendStatus(403)
        jwt.verify(token, JWT_SIGNATURE_KEY, (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.email = decoded.email
            next()
        })
    }

    async logout(req, res) {
        const refreshToken = (req.cookies.refreshToken);
        // return res.json({msg:refreshToken})
        if (!refreshToken) return res.sendStatus(204)
        const user = await User.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user) return res.sendStatus(204)
        const userId = user.id
        await User.update({ refresh_token: null }, {
            where: { id: userId }
        })
        res.clearCookie("refreshToken")
        return res.sendStatus(200)
    }
}
module.exports = UserController


