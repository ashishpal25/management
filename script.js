(async function () {
    const data= await fetch('./data.json')
    const res= await data.json()
    

    //first data emp all detail
    let empid=res[0].id
    let emp=res[0]

    //target id 
    const emplist=document.querySelector('.add-list')
    const empdetail=document.querySelector('.show-detail')

    //

    emplist.addEventListener("click", (e)=>{
        if(e.target.tagName ==="SPAN" && empid !==e.target.id){
            empid=e.target.id
            returnemp()
            returndetail()
        }
    })

    const returnemp=()=>{
        emplist.innerHTML=''
        res.forEach(element => {
            const span=document.createElement("span")
            span.classList.add("new-add-list")

            if(parseInt(empid)===element.id){
                span.classList.add("selected")
                emp=element
            }

            span.setAttribute("id",element.id)
            span.innerHTML=`${element.firstName} ${element.lastName}`
            emplist.append(span)
        });
    }

    const returndetail=()=>{
        
        empdetail.innerHTML=""
        const dd=document.createElement("div")
        dd.classList.add("new-detail")
        dd.setAttribute('id',emp.id)
        dd.innerHTML=`
        <div>
         <span>${emp.firstName}</span>
        <span>${emp.lastName}</span>
        </div>
        <span>${emp.email}</span>
        <span>${emp.contactNumber}</span>
        <span>${emp.address}</span>
        `
        empdetail.append(dd)

    }

    if(emp)returndetail();
    returnemp()

    function populateForm(emp){
        document.getElementById("id").value = emp.id;
        document.getElementById("firstName").value = emp.firstName;
        document.getElementById("lastName").value = emp.lastName;
        document.getElementById("email").value = emp.email;
        document.getElementById("contactNumber").value = emp.contactNumber;
        document.getElementById("age").value = emp.age;
        document.getElementById("dob").value = emp.dob;
        document.getElementById("address").value = emp.address;
        }

    const edit=document.querySelector(".edit")
    const idshow=document.querySelector(".onsub")
    edit.addEventListener("click",(e)=>{
        idshow.classList.add("showclass")
        if (emp) {
            populateForm(emp);
            
        }

    })

    const addform=document.getElementById("dataForm") ;

    addform.addEventListener("submit",(e)=>{
        e.preventDefault()
        const formdata=new FormData(addform)
        const values=[...formdata.entries()]
        const jsonObject = Object.fromEntries(values);
        
         jsonObject.id =parseInt(jsonObject.id)
        if (jsonObject.id) {
           
            const index = res.findIndex(emp => emp.id == jsonObject.id);
            console.log(index)
            if (index !== -1) {
              
                res[index] = jsonObject;
            }
        } else {
           
            jsonObject.id = res.length ? Math.max(...res.map(emp => emp.id)) + 1 : 1;
            res.push(jsonObject);
        }
        idshow.classList.remove("showclass")
        addform.reset();
        returnemp();
        returndetail()
    })

    console.log(res)

    
})()