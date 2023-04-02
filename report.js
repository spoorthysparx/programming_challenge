fetch("data.json")
.then(function(response){
   return response.json();
})
.then(function(studentmarks){
   let placeholder = document.querySelector("#data-output");
   let out = "";
  for(const key in studentmarks) {
      out += `
         <tr>
            <td> ${studentmarks[key].studentName} </td>
            <td>${studentmarks[key].studentID}</td>
            <td>${studentmarks[key].subject1}</td>
            <td>${studentmarks[key].subject2}</td>
            <td>${studentmarks[key].subject3}</td>
            <td>${studentmarks[key].subject4}</td>
            <td>${studentmarks[key].subject5}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
});