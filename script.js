//------variable---------

var form=document.getElementById('add-frm');
var items=document.getElementById('items');
var items2=document.getElementById('items2');
var nclass=document.getElementById('clz-title');
var nfreq=document.getElementById('fre-title');
var tableDiv=document.getElementById('tbl-div');
var tableDivA=document.getElementById('tbl-div2');
var del=document.getElementById('dele');
var enterBtn=document.getElementById('enter');
var resultsc=document.getElementById('result');
var chrt=document.getElementById('chart');
//var chrt0=document.getElementById()


var rowCount=0;
var newRow='';
var newRowD='';
var isUpdate=false;
var cf=0;

var dataset=[];

var gmean;
var gmedian;
var gmode;



         


//------events---------

//for page loads

window.onload=updateTable;

//window.onload=updateDownTable;

//for submit row
form.addEventListener('submit', addDetails);

//for remove

items.addEventListener('click', removeRow);

//delete all
del.addEventListener('click', deleteall);

//for enter
enterBtn.addEventListener('click', getResult);

chrt.addEventListener('click',chart);


//reset

//resetBtn.addEventListener('click',resetAll);

//------functions---------

//update table
function updateTable(){
    // display the table when rows get added
    if(rowCount >0){
        tableDiv.style.display='';
        items.appendChild(newRow);
    }
    else{
        tableDiv.style.display='none';
    }

}

//update downtable
function updateDownTable(){
    // display the table when rows get added
    if(rowCount >0){
        tableDivA.style.display='';
        items2.appendChild(newRowD);
    }
    else{
        tableDivA.style.display='none';
    }

}

function addDetails(e){
    e.preventDefault();

    //validate inputs

    if(nclass.value == '' || nfreq.value ==''){
        alert("Please fill all fields ");
    }
    else{
        // create a new row record

        //new tr

        var tr=document.createElement('tr');
        var trd=document.createElement('tr');
        tr.className='item';
        tr.className='itemd';

        var classdata=nclass.value+"";
        var boundary=classdata.split("-");
        var freq=nfreq.value;
        console.log(boundary);

        var datarow= new Datarow(parseFloat(boundary[1]),parseFloat(boundary[0]),parseFloat(freq));
        var classmark=(datarow.lb+datarow.ub)/2.0;
        var fm=classmark*datarow.f;
        cf+=datarow.f;
        var fxx=classmark*datarow.f*classmark;
       
            
        
        console.log(cf);
        dataset.push(datarow);
        console.log(datarow);


        // new td for class intervel and frequency

        var td1=document.createElement('td');
        td1.appendChild(document.createTextNode(nclass.value));

        var td2=document.createElement('td');
        td2.appendChild(document.createTextNode(nfreq.value));

         //new td for delete
         var td3=document.createElement('td');
         td3.className='btcelld';
         var btn1=document.createElement('button');
         btn1.appendChild(document.createTextNode('Delete'));
         btn1.setAttribute('id', 'del');
         td3.appendChild(btn1);

         //add all to tr

         tr.appendChild(td1);
         tr.appendChild(td2);
         tr.appendChild(td3);

         //down table

         var tdd1=document.createElement('td');
         tdd1.appendChild(document.createTextNode(nclass.value));
         var tdd2=document.createElement('td');
         tdd2.appendChild(document.createTextNode(nfreq.value));
         var tdd3=document.createElement('td');
         tdd3.appendChild(document.createTextNode(classmark.toString()));
         var tdd4=document.createElement('td');
         tdd4.appendChild(document.createTextNode(fm.toString()));
         var tdd5=document.createElement('td');
         tdd5.appendChild(document.createTextNode(fxx.toString()));
         var tdd6=document.createElement('td');
         tdd6.appendChild(document.createTextNode(cf.toString()));


        
        //add all to tr

        trd.appendChild(tdd1);
        trd.appendChild(tdd2);
        trd.appendChild(tdd3);
        trd.appendChild(tdd4);
        trd.appendChild(tdd5);
        trd.appendChild(tdd6);



         //increment row count

         rowCount++;

         //set new row

         newRow=tr;
         newRowD=trd;

         

           // add or update the row of the table
         updateTable();
         updateDownTable();
         resetAll();
        


    }
}


//remove note

function removeRow(e){
    if(e.target.id ==='del'){
        if(confirm("Are you sure?")){
            //delete row

            var tr=e.target.parentElement.parentElement;
            items.removeChild(tr);
            
            //update table

            rowCount--;
            if(rowCount === 0){
                updateTable();
               
            }
        }
    }
}

//reset all

function  resetAll(){
    nclass.value='';
    nfreq.value='';
    isUpdate=false;
    newRow='';
    newRowD='';


}

class Datarow {
    constructor(ub, lb,f) {
      this.ub = ub;
      this.lb = lb;
      this.f=f;
    }
  } 


  function deleteall(e){

    if(e.target.id ==='dele'){
        if(confirm("Are you sure?")){

            items.remove();
            items2.remove();
            total.remove();
           

        }
    }
   
   
  }
        
  //enter all

  function getResult(){
       
    var tf=0;
    var tfx=0;
    let max=0;
    var tfxx=0;


    dataset.forEach(function(element){
        tf+=element.f;
        tfx+=element.f*((element.lb+element.ub)/2.0);
        tfxx+=element.f*(((element.lb+element.ub)/2.0)*((element.lb+element.ub)/2.0));
        if (max<element.f) {
            max=element.f; 

    } 

    })

    console.log(+tf+"-----------------"+tfx);
    console.log(tfxx);
    //calculate mean

    var r= "Mean ="+(tfx/tf);
    gmean=(tfx/tf);

    var pra=document.createElement('h4');
    pra.style.color="blue";
    pra.style.fontSize="20px";
    pra.style.margin="30px";
    pra.appendChild(document.createTextNode(r));

    resultsc.appendChild(pra);


        //calculate median

    var cumf=0;
    let mfid=0;

    for (let index = 0; index < dataset.length; index++) {
        var element = dataset[index];
        cumf+=element.f;

        if(cumf>=tf/2){
            mfid=index;
            console.log(element);
            break;
        }     
    }
    var mclass=dataset[mfid];

    var median="Median ="+(mclass.lb+(((tf/2)-(cumf-mclass.f))/mclass.f)*(mclass.ub-mclass.lb));
    gmedian=(mclass.lb+(((tf/2)-(cumf-mclass.f))/mclass.f)*(mclass.ub-mclass.lb));

    console.log(median);

    var pra2=document.createElement('h4');
    pra2.style.color="blue";
    pra2.style.fontSize="20px";
    pra2.style.margin="30px";
    pra2.appendChild(document.createTextNode(median));

    resultsc.appendChild(pra2);

    //calculate mode

    let f0=0;
    let f1=0;
    let f2=0;
    let c=0;
    let modlb=0;
    

    

    for (let index = 0; index < dataset.length; index++) {
        var element = dataset[index];
      
       
        if(max==element.f){
           f0=dataset[index-1].f;
           f1=max;
           f2=dataset[index+1].f;
           c=element.ub-element.lb;
           modlb=element.lb;
             break;

        }   
        


    }

    // console.log(f0);
    //     console.log(f1);
    //     console.log(f2);
    //     console.log(c);
    //     console.log(modlb);
    //     console.log(max);

    var mode="Mode ="+(modlb+((f1-f0)/((f1-f0)+(f1-f2)))*c);
    gmode=(modlb+((f1-f0)/((f1-f0)+(f1-f2)))*c);

    console.log(mode);

     var pra3=document.createElement('h4');
     pra3.style.color="blue";
     pra3.style.fontSize="20px";
     pra3.style.margin="30px";
     pra3.appendChild(document.createTextNode(mode));

     resultsc.appendChild(pra3);


    //calculate varience

    var varience="Varience ="+(tf*(tfxx)-(tfx)*(tfx))/tf*(tf-1);

    var pra4=document.createElement('h4');
    pra4.style.color="blue";
    pra4.style.fontSize="20px";
    pra4.style.margin="30px";
    pra4.appendChild(document.createTextNode(varience));

    resultsc.appendChild(pra4);
    console.log(varience);

    //Standard Deviation

    
    var pra5=document.createElement('h4');
    pra5.style.color="blue";
    pra5.style.fontSize="20px";
    pra5.style.margin="30px";
    pra5.appendChild(document.createTextNode("Standard Deviation =" +Math.sqrt((tf*(tfxx)-(tfx)*(tfx))/tf*(tf-1))));

    resultsc.appendChild(pra5);
 

    }


//     function chart(){

//         const hdataset=[];
//         const vdataset=[];
//         dataset.forEach(function(element){
//           vdataset.push(element.f);
//           hdataset.push(element.lb+"-"+element.ub) ;
    
//         });


//  var ctx = document.getElementById("myChart");

// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: hdataset,
//     datasets: [{
//       label: '# Histogram',
//       data: vdataset,
//       backgroundColor: [
//         'rgba(9, 16, 227, 0.2)'
       
        
        
//       ],
//       borderColor: [
//         'rgba(9, 16, 227,1)',
    
       
      
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: false,
//     scales: {
//       xAxes: [{
//         ticks: {
//           maxRotation: 90,
//           minRotation: 80
//         },
//           gridLines: {
//           offsetGridLines: true // à rajouter
//         }
//       },
//       {
//         position: "top",
//         ticks: {
//           maxRotation: 90,
//           minRotation: 80
//         },
//         gridLines: {
//           offsetGridLines: true // et matcher pareil ici
//         }
//       }],
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });
//     }




 function chart(){

   const hdataset=[];
   const vdataset=[];
   let title="";

   console.log(gmean);
   console.log(gmode);
   console.log(gmedian);

   if(gmode===gmean && gmean===gmode && gmode===gmedain){

    hdataset.push("Mode \n Median \n Mode");
    vdataset.push(gmode);
    title="Symmetric";

    console.log("prnit1");

   }
   else if(gmode>gmedian && gmedian>gmean){
     
    hdataset.push("Mode", "Median","Mean");
    vdataset.push(gmode,gmedian,gmean);
    title="Positively skewed or right skewed";

    console.log("prnit2");

   }
   else if(gmean>gmedian && gmedian>gmode){
      hdataset.push("Mean", "Median","Mode" );
      vdataset.push(gmean,gmedian,gmode);
      title="Negatively skewed or left skewed";

      console.log("prnit3");
   }
   else{
    console.log("prnit4");
   }

  

  
 var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: hdataset,
    datasets: [{
      label: '# Distribution shapes',
      data: vdataset,
      backgroundColor: [
        'rgba(9, 16, 227, 0.2)'
       
        
        
      ],
      borderColor: [
        'rgba(9, 16, 227,1)',
    
       
      
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
          gridLines: {
          offsetGridLines: true // à rajouter
        }
      },
      {
        position: "top",
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
        gridLines: {
          offsetGridLines: true // et matcher pareil ici
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


 }

      
    




     



