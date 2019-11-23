var dict = {};
var output=[];
function clean(l){
    var cleanstr=" ";
    for (let x=0;x<l.length;x++){
        if(l[x]=='.' || l[x]==',' || l[x]=='-' || l[x]=='"' || l[x]=='?'){
            continue;
        }
        else{
            cleanstr+=l[x];
        }
    }
    console.log(cleanstr)
    return cleanstr

}
function store() {
    var myform =document.getElementById("userform").value;
    //console.log(myform)
    if(myform=="")
        display="enter any document!!!!";
    else
        display="successfully indexed, you can search now!!!";
    document.getElementById('display').innerHTML = display;
    output = myform.split("\n\n")
    //console.log(output)
    var ln=0;
    var doc=0;
    for(let i=0;i<output.length;i++){
        //console.log(output[i]);
        ln+=1;
        let cleanout=clean(output[i]);
        cleanout=cleanout.toLowerCase();
        let l=cleanout.split(" ");
        //console.log(l)
        l.forEach(word => {
           //console.log(l[j])
           if(!dict.hasOwnProperty(word)){
            //console.log(word)
            dict[word]=[]
            dict[word].push(1)
            dict[word].push([ln])
            } 
            else{
                dict[word][0]+=1
                dict[word][1].push(ln)
            }
        });
    }
    //console.log(dict) 
    for (let [key, value] of Object.entries(dict)) {
        //console.log(value[1]);
        value[1]=new Set(value[1])
      }
    console.log(dict);
    //localStorage.setItem('dict',JSON.stringify(dict));
}
function displayresult(){
    var word =document.getElementById("userword").value;
    //console.log(word)
    //document.getElementById('display').innerHTML = word;
    //console.log(dict);
    //console.log(output);
    var z=0;
    resultstr=`<h1 align="center">The Entered Word '${word}' is present in </h1>`;
    if(dict.hasOwnProperty(word)){
        console.log('happy it is there');
        console.log(dict[word][1])
        let setvalue=dict[word][1]
        //console.log(setvalue);
        for (const k of setvalue.keys()) {
            z+=1
            if(z<=10){
            resultstr+=`
                    <h4>${output[k-1]}</h4>
            `
            console.log(output[k-1])
            }
          }
        console.log(resultstr)
        highlight_word(resultstr,word)
        //document.getElementById('resultpara').innerHTML=resultstr;
    }
    else{
        resultstr=`<h4>The Entered Word '${word}' is not present in the document</h4>`
        document.getElementById('resultpara').innerHTML=resultstr;
    }
}
function highlight_word(searchpara,text)
{
text=text+" ";
 //var text=document.getElementById("search_text").value;
 if(text)
 {
  var pattern=new RegExp("(" + text + ")", "gi");
  var new_text=searchpara.replace(pattern, "<span class='highlight'>" + text + "</span>");
  document.getElementById('resultpara').innerHTML=new_text;
 }
}