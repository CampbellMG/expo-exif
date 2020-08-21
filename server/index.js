const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const exif = require("exif").ExifImage;

const app = express();
const httpServer = http.createServer(app);
const upload = multer({dest: __dirname + "/uploads"});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.post("/", upload.single("data"), (req, res) => {
    const tempPath = req.file.path;
    const image = __dirname + "/uploads/image.jpg";
    const targetPath = path.join(image);

    fs.rename(tempPath, targetPath, err => {
        if (err) {
            res.status(500)
                .contentType("text/plain")
                .end("Something went wrong renaming image");
            return
        }

        new exif({image}, (error, data) => {
            if (error) {
                res.status(500)
                    .contentType("text/plain")
                    .end("Something went wrong extracting exif");
                return
            }

            fs.writeFile(__dirname + "/uploads/exif.json", JSON.stringify(data, undefined, 2), (error) => {
                if (error) {
                    res.status(500)
                        .contentType("text/plain")
                        .end("Something went wrong writing exif");
                    return
                }

                console.log("Uploaded file")

                res.status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        });
    });
});

app.get("/", (req, res) => res.sendFile(__dirname + '/image.jpg'))
