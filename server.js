const fastify = require("fastify")({ logger: true });
const fs = require("fs");
const { getData, saveData } = require("./utils");
var http = require('http')
var path = require('path');

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '.'),
    prefix: '',
  });

fastify.get('/report', function (req, reply) {
    reply.sendFile('report.html') 
  })
  

fastify.get("/getStudents", async (request, reply) => {
  var data = getData();
  return data;
});

fastify.get("/getStudentById/:id", async (request, reply) => {
  data = getData();
  studentId = request.params["id"];
  return data[studentId]

});

fastify.post("/addStudent", async (request, reply) => {
  var data = getData();
  var newData = JSON.parse(request.body);

  const studentId = newData["studentID"];
 data[studentId] = newData;

  console.log(data);
  saveData(data);
  reply.send({ success: true, msg: "student added successfully" });
});

fastify.delete("/deleteStudentById/:id", async (request, reply) => {

  let studentId = request.params["id"];
  data = getData()
  delete data[studentId]
  saveData(data)
  reply.send({ success: true, msg: "student deleted successfully" });

});

fastify.post("/updateStudentById/:id", async (request, reply) => {

    let studentId = request.params["id"];
    data = getData()
    data[studentId] = JSON.parse(request.body)
    saveData(data)
    reply.send({ success: true, msg: "student updated successfully" });
  
  });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
