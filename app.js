const express = require("express");
const app = express();
const Logger = require("./logger");
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || "8000";

const logger = new Logger();

const members = require("./dummyData");

app.use(logger.print)

app.get("/api/members", async (req, res) => {
    console.log("get all members");
    res.status(200).send(members);
});

app.get("/api/member/:memberId", async (req,res) => {
    console.log(req.params.memberId);
    const result = members.find(member => member.id === Number(req.params.memberId));
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send("member not found");
    }
})

app.post("/api/member", async (req, res) => {
    console.log("post new member")
    const newMember = req.body;
    newMember.id = members.length + 1;
    members.push(newMember);
    res.status(200).send(members)
})

app.patch("/api/member/memberId", async (req, res) => {
    const memberId = req.params.memberId;
    const newMemberInfo = req.body;
    const matchedMemberIndex = members.findIndex(member => member.id === Number(memberId));
    if (matchedMemberIndex) {
        newMemberInfo.id = matchedMemberIndex + 1;
        members[matchedMemberIndex] = newMemberInfo;
        res.status(200).send(members);
    } else {
        res.status(404).send("Member not found.");
    }
})

app.put("/api/member/:memberId", async (req, res) => {
    console.log("putting member");
    const memberId = req.params.memberId;
    const newMemberInfo = req.body;
    const matchedMemberIndex = members.findIndex(member => member.id === Number(memberId));
    if (matchedMemberIndex) {
        newMemberInfo.id = matchedMemberIndex + 1;
        members[matchedMemberIndex] = newMemberInfo;
        res.status(200).send(members);
    } else {
        res.status(404).send("Member not found.");
    }
})

app.delete("/api/member/:memberId", async(req, res) => {
    console.log("deleting member");
    const memberId = req.params.memberId;
    const matchedMemberIndex = members.findIndex(member => member.id === Number(memberId));
    if (matchedMemberIndex) {
        members.splice(index, 1);
        res.status(200).send(members);
    } else {
        res.status(404).send("Member not found");
    }
})

app.listen(port, () => {
    console.log("listening on port " + port);
})