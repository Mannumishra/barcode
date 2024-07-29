const user = require("../Model/UserModel");
const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

const createUser = async (req, res) => {
    try {
        const { name, age, phone, address, email } = req.body;
        console.log(req.body);
        const errorMessage = [];
        if (!name) errorMessage.push("Name is must required");
        if (!age) errorMessage.push("age is must required");
        if (!address) errorMessage.push("address is must required");
        if (!phone) errorMessage.push("phone is must required");
        if (!email) errorMessage.push("email is must required");
        if (errorMessage.length > 0) {
            return res.status(401).json({
                success: false,
                mess: errorMessage.join(",")
            });
        } else {
            const data = new user({ name, age, phone, address, email });
            await data.save();
            const barcodeUrl = `https://barcode-030i.onrender.com/api/user/${data._id}`;
            data.barcodeUrl = barcodeUrl;
            bwipjs.toBuffer({
                bcid: 'qrcode',       // बारकोड का प्रकार
                text: barcodeUrl,     // बारकोड में एन्कोड करने के लिए URL
                scale: 3,             // पैमाना
                height: 10,           // ऊँचाई
                includetext: true,    // टेक्स्ट को शामिल करें
                textxalign: 'center', // टेक्स्ट संरेखण
            }, function (err, png) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        mess: "Error generating barcode"
                    });
                } else {
                    // बारकोड को फाइल में सहेजें
                    const barcodeFileName = `barcode_${data._id}.png`; // फ़ाइल का नाम
                    const barcodeFilePath = path.join(__dirname, '../Public', barcodeFileName); // फ़ाइल का पथ
                    fs.writeFile(barcodeFilePath, png, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({
                                success: false,
                                mess: "Error saving barcode to file"
                            });
                        } else {
                            data.barcodeFilePath = barcodeFilePath;
                            data.save().then(() => {
                                res.status(200).json({
                                    success: true,
                                    mess: "New user created successfully",
                                    data: data
                                });
                            }).catch(error => {
                                console.error(error);
                                res.status(500).json({
                                    success: false,
                                    mess: "Error saving user with barcode"
                                });
                            });
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Server error"
        });
    }
};

const getUser = async(req,res)=>{
    try {
        let data = await user.findOne({_id:req.params._id})
        if(data){
            res.status(200).json({
                success: true,
                mess: "User find",
                data: data
            });
        }
        else{
            res.status(404).json({
                success: false,
                mess: "User find not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal server error",
        });
    }
}

module.exports = {
    createUser ,getUser
};
