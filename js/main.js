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
    //console.log(cleanstr)
    return cleanstr
}
function store() {
    var myform =document.getElementById("userform").value;
    if(myform=="")
        display="enter any document!!!!";
    else
        display="successfully indexed, you can search now!!!";
    document.getElementById('display').innerHTML = display;
    output = myform.split("\n\n")
    var ln=0;
    var doc=0;
    for(let i=0;i<output.length;i++){
        ln+=1;
        let cleanout=clean(output[i]);
        cleanout=cleanout.toLowerCase();
        let l=cleanout.split(" ");
        l.forEach(word => {
           if(!dict.hasOwnProperty(word)){
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
    for (let [key, value] of Object.entries(dict)) {
        //console.log(key);
        value[1]=arrange(value[1]);
        console.log(value[1]);
        value[1]=new Set(value[1])
        //console.log(sample)
      }
}
function displayresult(){
    var word =document.getElementById("userword").value;
    var z=0;
    resultstr=`<h1 align="center">The Entered Word '${word}' is present in </h1>`;
    if(dict.hasOwnProperty(word)){
        let setvalue=dict[word][1]
        for (const k of setvalue.keys()) {
            z+=1
            if(z<=10){
            resultstr+=`
                    <h4>${output[k-1]}</h4>
            `
            //console.log(output[k-1])
            }
          }
        //console.log(resultstr)
        highlight_word(resultstr,word)
    }
    else{
        resultstr=`<h4>The Entered Word '${word}' is not present in the document</h4>`
        document.getElementById('resultpara').innerHTML=resultstr;
    }
}
function highlight_word(searchpara,text)
{
text=text+" ";
 if(text)
 {
  var pattern=new RegExp("(" + text + ")", "gi");
  var new_text=searchpara.replace(pattern, "<span class='highlight'>" + text + "</span>");
  document.getElementById('resultpara').innerHTML=new_text;
 }
}
function clearpara(){
    document.getElementById('userform').value="";
    document.getElementById('userword').value="";
    location.reload();
}
function arrange(myArray)
{
    var newArray = [];
    var freq = {};
    var i=myArray.length-1;
    for (var i;i>-1;i--)
    {
        var value = myArray[i];
        freq[value]==null?freq[value]=1:freq[value]++;
    }
    for (var value in freq)
    {
        newArray.push(value);
    }
    function compareFreq(a,b)
    {
        return freq[b]-freq[a];
    }

    return newArray.sort(compareFreq);
}