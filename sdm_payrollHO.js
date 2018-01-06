/**
 * @author Developer E-Komoditi Solutions Indonesia
 */
function validatepayroll()
{
        pw=document.getElementById('pypwd').value;
        param='pwd='+pw;
                post_response_text('hr_slaveValidatePayroll.php', param, respon);
                    function respon(){
                        if (con.readyState == 4) {
                            if (con.status == 200) {
                                busy_off();
                                if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR TRANSACTION,\n' + con.responseText);
                                }
                                else {
                                                        window.location.reload();
                                                }
                            }
                            else {
                                busy_off();
                                error_catch(con.status);
                            }
                        }
                    }		
}

function editComp(id,name,jenis,type,lock,isangsuran)
{

        document.getElementById('comp').value=name;
        document.getElementById('compid').value=id;

        jk1=document.getElementById('plus');
        for(x=0;x<jk1.length;x++)
        {
                if(jk1.options[x].value==jenis)
                {
                        jk1.options[x].selected=true;
                }
        }

        jk2=document.getElementById('type');
        for(x=0;x<jk2.length;x++)
        {
                if(jk2.options[x].value==type)
                {
                        jk2.options[x].selected=true;
                }
        }	

        jk3=document.getElementById('lock');
        for(x=0;x<jk3.length;x++)
        {
                if(jk3.options[x].value==lock)
                {
                        jk3.options[x].selected=true;
                }
        }			
		if (isangsuran==1){
			document.getElementById('isangsuran').checked=true;
		}
		else  {
			document.getElementById('isangsuran').checked=false;
		}
        document.getElementById('legend').innerHTML='<b>Edit Form (id='+id+')</b>';
}

function cancelComp()
{
        document.getElementById('legend').innerHTML='<b>New Form</b>';
        document.getElementById('compid').value='';
        document.getElementById('comp').value='';
		document.getElementById('isangsuran').checked=false;
}

function saveComp()
{
        name=document.getElementById('comp').value;
        id	=document.getElementById('compid').value;
        isangsuran	=document.getElementById('isangsuran').checked;
        plus=document.getElementById('plus').options[document.getElementById('plus').selectedIndex].value;	
        type=document.getElementById('type').options[document.getElementById('type').selectedIndex].value;
        lock=document.getElementById('lock').options[document.getElementById('lock').selectedIndex].value;
		cnfsimpan=document.getElementById('cnfsimpan').value;
		if (isangsuran==true){
			isangsurans=1;
		}
		else {
			isangsurans=0;
		}
        if (trim(name).length>0 && confirm(cnfsimpan)) {
                param = 'name=' + name + '&id=' + id+'&plus='+plus+'&type='+type+'&lock='+lock+'&isangsurans='+isangsurans;
                post_response_text('sdm_slaveSavePayrollHOComponent.php', param, respon);
        }
                    function respon(){
                        if (con.readyState == 4) {
                            if (con.status == 200) {
                                busy_off();
                                if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR TRANSACTION,\n' + con.responseText);
                                }
                                else {
                                                        document.getElementById('tablebody').innerHTML=con.responseText;
                                                        cancelComp();
                                                }
                            }
                            else {
                                busy_off();
                                error_catch(con.status);
                            }
                        }
                    }		
}
function delComp(id,name)
{
  //if(confirm('Delete component: '+name+'\nAre you sure?'))
  if(confirm(cnfhapus))
  {
         param='id='+id;
         post_response_text('sdm_slaveDelPayrollHOComponent.php', param, respon);
  }
    function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                                        document.getElementById('tablebody').innerHTML=con.responseText;
                                        cancelComp();
                                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }		
}

function checkAll(obj,max)
{
        for (x = 1; x <= max; x++) {
                if (obj.checked)
                 document.getElementById('chk'+x).checked=true;
                else
                document.getElementById('chk'+x).checked=false;
        }
}
var jumldata=0;
function sync(juml)
{
        //start from begining again
        jumldata=0;
        dosync(juml);
}
function dosync(juml)
{
		cnfsimpan=document.getElementById('cnfsimpan').value;
		alsimpan=document.getElementById('alsimpan').value;
        jumldata+=1;
        if (jumldata <= juml) {
                if (document.getElementById('chk' + jumldata).checked) {
                        userid = document.getElementById('userid' + jumldata).innerHTML;
                        nama = document.getElementById('nama' + jumldata).innerHTML;
                        mstatus = document.getElementById('mstatus' + jumldata).innerHTML;
                        start = document.getElementById('start' + jumldata).innerHTML;
                        resign = document.getElementById('resign' + jumldata).innerHTML;
                        npwp = document.getElementById('npwp' + jumldata).innerHTML;
                        
                        document.getElementById('stpbutton').disabled = false;

                        if (jumldata == 1) {

                                if (confirm(cnfsimpan)) {
                                        param = 'userid=' + userid + '&nama=' + nama + '&mstatus=' + mstatus + '&start=' + start + '&resign=' + resign + '&npwp=' + npwp;
                                        document.getElementById('row' + jumldata).style.backgroundColor = 'orange';
                                        post_response_text('sdm_slaveSyncronizePYHO.php', param, respon);
                                }
                                document.getElementById('synbutton').disabled = true;
                        }

                else {
                        param = 'userid=' + userid + '&nama=' + nama + '&mstatus=' + mstatus + '&start=' + start + '&resign=' + resign + '&npwp=' + npwp;
                        document.getElementById('row' + jumldata).style.backgroundColor = 'orange';
                        post_response_text('sdm_slaveSyncronizePYHO.php', param, respon);
                }
        }
        else {
                dosync(juml);
        }		 
        }
        else
        {
                alert(alsimpan);
                document.getElementById('stpbutton').disabled=true;
                document.getElementById('synbutton').disabled=false;
        }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                                document.getElementById('row'+jumldata).style.backgroundColor='red';
                            document.getElementById('synbutton').disabled=true;
                                        }
                        else {
                                                document.getElementById('row'+jumldata).style.backgroundColor='green';
                                                dosync(juml);
                                        }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }						
}
function stopSync(x)
{
        //this will stop synchronization
        jumldata=x;
        document.getElementById('synbutton').disabled=false;
        document.getElementById('stpbutton').disabled=true
}

function vLine(obj,no)
{
        if (obj.checked) {
			
                document.getElementById('userid' + no).disabled = false;
                document.getElementById('bank' + no).disabled = false;
                document.getElementById('bankac' + no).disabled = false;
                document.getElementById('jms1' + no).disabled = false;
                document.getElementById('jms2' + no).disabled = false;
                document.getElementById('jms3' + no).disabled = false;
                document.getElementById('jmsstartbl' + no).disabled = false;
                document.getElementById('jms2startbl' + no).disabled = false;
                document.getElementById('jms3startbl' + no).disabled = false;
                document.getElementById('jmsstartth' + no).disabled = false;		
                document.getElementById('jms2startth' + no).disabled = false;		
                document.getElementById('jms3startth' + no).disabled = false;		
                document.getElementById('firstbl' + no).disabled = false;
                document.getElementById('firstth' + no).disabled = false;
                document.getElementById('firstvol' + no).disabled = false;
                document.getElementById('lastbl' + no).disabled = false;
                document.getElementById('lastth' + no).disabled = false;
                document.getElementById('lastvol' + no).disabled = false;
                document.getElementById('butt' + no).disabled = false;
                document.getElementById('bpjskeskelas'+ no).disabled = false;
        }
        else
        {
                document.getElementById('userid' + no).disabled = true;
                document.getElementById('bank' + no).disabled = true;
                document.getElementById('bankac' + no).disabled = true;
                document.getElementById('jms1' + no).disabled = true;
                document.getElementById('jms2' + no).disabled = true;
                document.getElementById('jms3' + no).disabled = true;
                document.getElementById('jmsstartbl' + no).disabled = true;
                document.getElementById('jms2startbl' + no).disabled = true;
                document.getElementById('jms3startbl' + no).disabled = true;
                document.getElementById('jmsstartth' + no).disabled = true;		
                document.getElementById('jms2startth' + no).disabled = true;		
                document.getElementById('jms3startth' + no).disabled = true;		
                document.getElementById('firstbl' + no).disabled = true;
                document.getElementById('firstth' + no).disabled = true;
                document.getElementById('firstvol' + no).disabled = true;
                document.getElementById('lastbl' + no).disabled = true;
                document.getElementById('lastth' + no).disabled = true;
                document.getElementById('lastvol' + no).disabled = true;
                document.getElementById('butt' + no).disabled = true;	
                document.getElementById('bpjskeskelas'+ no).disabled = true;		
        }
}

function saOneLine(no)
{
                userid	=trim(document.getElementById('userid' + no).innerHTML);
                bank	=document.getElementById('bank' + no).value;
                bankac	=document.getElementById('bankac' + no).value;
				
                jms		=document.getElementById('jms1' + no).value;
                jms2		=document.getElementById('jms2' + no).value;
                jms3		=document.getElementById('jms3' + no).value;
				
                jmsstartbl	=document.getElementById('jmsstartbl' + no).options[document.getElementById('jmsstartbl' + no).selectedIndex].value;
                jms2startbl	=document.getElementById('jms2startbl' + no).options[document.getElementById('jms2startbl' + no).selectedIndex].value;
                jms3startbl	=document.getElementById('jms3startbl' + no).options[document.getElementById('jms3startbl' + no).selectedIndex].value;
                jmsstartth = document.getElementById('jmsstartth' + no).options[document.getElementById('jmsstartth' + no).selectedIndex].value;		
                jms2startth = document.getElementById('jms2startth' + no).options[document.getElementById('jms2startth' + no).selectedIndex].value;		
                jms3startth = document.getElementById('jms3startth' + no).options[document.getElementById('jms3startth' + no).selectedIndex].value;	                
				bpjskeskelas = document.getElementById('bpjskeskelas' + no).options[document.getElementById('bpjskeskelas' + no).selectedIndex].value;	
				
                jmsperiod=jmsstartth+"-"+jmsstartbl;
                jms2period=jms2startth+"-"+jms2startbl;
                jms3period=jms3startth+"-"+jms3startbl;
				
                firstbl	=document.getElementById('firstbl' + no).options[document.getElementById('firstbl' + no).selectedIndex].value;
                firstth =document.getElementById('firstth' + no).options[document.getElementById('firstth' + no).selectedIndex].value;
                firstperiod=firstth+"-"+firstbl;
                firstvol=document.getElementById('firstvol' + no).value;
                lastbl  =document.getElementById('lastbl' + no).options[document.getElementById('lastbl' + no).selectedIndex].value;
                lastth  =document.getElementById('lastth' + no).options[document.getElementById('lastth' + no).selectedIndex].value;
                lastperiod=lastth+"-"+lastbl;
                lastvol =document.getElementById('lastvol' + no).value;	
        if(trim(lastperiod).length!=7)
           lastperiod='';
        if(trim(firstperiod).length!=7)
           firstperiod='';
        if(lastvol=='')
             lastvol=0;
        if(firstvol=='')
             firstvol=0;
        bankAccountColor(no,'orange');	 
        if (trim(bankac) != '' && trim(bank) != '' && trim(firstperiod).length==7) {
                param = 'userid=' + userid + '&bank=' + bank + '&bankac=' + bankac;
                param += '&jms=' + jms + '&firstperiod=' + firstperiod;
                param += '&firstvol=' + firstvol + '&lastperiod=' + lastperiod + '&lastvol=' + lastvol+'&jmsperiod='+jmsperiod;
                param += '&jms2=' + jms2 + '&jms3=' + jms3 + '&jms2period=' + jms2period+'&jms3period='+jms3period+'&bpjskeskelas='+bpjskeskelas;
                post_response_text('sdm_slaveSavePyHOEmployeeData.php', param, respon);
        }
        else
        {
                alert('Bank account & first payment are obligatory');
        }

   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                                bankAccountColor(no,'red');
                                        }
                        else {
                                                bankAccountColor(no,'#E8F2FC');
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function bankAccountColor(no,color)
{
        document.getElementById('bank' + no).style.backgroundColor=color;
        document.getElementById('bankac' + no).style.backgroundColor=color;
        document.getElementById('jms1' + no).style.backgroundColor=color;
        document.getElementById('jms2' + no).style.backgroundColor=color;
        document.getElementById('jms3' + no).style.backgroundColor=color;
        document.getElementById('jmsstartbl' + no).style.backgroundColor=color;
        document.getElementById('jms2startbl' + no).style.backgroundColor=color;
        document.getElementById('jms3startbl' + no).style.backgroundColor=color;
        document.getElementById('jmsstartth' + no).style.backgroundColor=color;	
        document.getElementById('jms2startth' + no).style.backgroundColor=color;	
        document.getElementById('jms3startth' + no).style.backgroundColor=color;	
        document.getElementById('firstbl' + no).style.backgroundColor=color;
        document.getElementById('firstth' + no).style.backgroundColor=color;
        document.getElementById('firstvol' + no).style.backgroundColor=color;
        document.getElementById('lastbl' + no).style.backgroundColor=color;
        document.getElementById('lastth' + no).style.backgroundColor=color;
        document.getElementById('lastvol' + no).style.backgroundColor=color;
        document.getElementById('bpjskeskelas' + no).style.backgroundColor=color;
}

function saveAll(max)
{
        jumldata=0;
        dosaveAll(max);
}

function dosaveAll(max)
{
	alsimpan=document.getElementById('alsimpan').value;
    jumldata+=1;
        if (jumldata <= max) {
                if (document.getElementById('check' + jumldata).checked) {
                        userid = trim(document.getElementById('userid' + jumldata).innerHTML);
                        bank = document.getElementById('bank' + jumldata).value;
                        bankac = document.getElementById('bankac' + jumldata).value;
                        jms = document.getElementById('jms1' + jumldata).value;
                        jms2 = document.getElementById('jms2' + jumldata).value;
                        jms3 = document.getElementById('jms3' + jumldata).value;
						
                    jmsstartbl	=document.getElementById('jmsstartbl' + jumldata).options[document.getElementById('jmsstartbl' + jumldata).selectedIndex].value;
                    jms2startbl	=document.getElementById('jms2startbl' + jumldata).options[document.getElementById('jms2startbl' + jumldata).selectedIndex].value;
                    jms3startbl	=document.getElementById('jms3startbl' + jumldata).options[document.getElementById('jms3startbl' + jumldata).selectedIndex].value;
                    jmsstartth =document.getElementById('jmsstartth' + jumldata).options[document.getElementById('jmsstartth' + jumldata).selectedIndex].value;		
                    jms2startth =document.getElementById('jms2startth' + jumldata).options[document.getElementById('jms2startth' + jumldata).selectedIndex].value;		
                    jms3startth =document.getElementById('jms3startth' + jumldata).options[document.getElementById('jms3startth' + jumldata).selectedIndex].value;
									
                    jmsperiod=jmsstartth+"-"+jmsstartbl;
					jms2period=jms2startth+"-"+jms2startbl;
					jms3period=jms3startth+"-"+jms3startbl;
					
					bpjskeskelas = document.getElementById('bpjskeskelas' + jumldata).options[document.getElementById('bpjskeskelas' + jumldata).selectedIndex].value;	
					
                        firstbl = document.getElementById('firstbl' + jumldata).options[document.getElementById('firstbl' + jumldata).selectedIndex].value;
                        firstth = document.getElementById('firstth' + jumldata).options[document.getElementById('firstth' + jumldata).selectedIndex].value;
                        firstperiod = firstth + "-" + firstbl;
                        firstvol = document.getElementById('firstvol' + jumldata).value;
                        lastbl = document.getElementById('lastbl' + jumldata).options[document.getElementById('lastbl' + jumldata).selectedIndex].value;
                        lastth = document.getElementById('lastth' + jumldata).options[document.getElementById('lastth' + jumldata).selectedIndex].value;
                        lastperiod = lastth + "-" + lastbl;
                        lastvol = document.getElementById('lastvol' + jumldata).value;
                        if (trim(lastperiod).length != 7) 
                                lastperiod = '';
                        if (trim(firstperiod).length != 7) 
                                firstperiod = '';
                        if (lastvol == '') 
                                lastvol = 0;
                        if (firstvol == '') 
                                firstvol = 0;
                        bankAccountColor(jumldata, 'orange');
							
                        if (trim(bankac) != '' && trim(bank) != '' && trim(firstperiod).length == 7) {
                                param = 'userid=' + userid + '&bank=' + bank + '&bankac=' + bankac;
                                param += '&jms=' + jms + '&firstperiod=' + firstperiod;
                                param += '&firstvol=' + firstvol + '&lastperiod=' + lastperiod + '&lastvol=' + lastvol+'&jmsperiod='+jmsperiod;
								param += '&jms2=' + jms2 + '&jms3=' + jms3 + '&jms2period=' + jms2period+'&jms3period='+jms3period+'&bpjskeskelas='+bpjskeskelas;
                                post_response_text('sdm_slaveSavePyHOEmployeeData.php', param, respon);
                        }
                        else {
                                alert('Bank account,JMS Start & first payment are obligatory');
                        }
                }
                else
                {
                 dosaveAll(max);	
                }
        }
        else
        {
                alert(alsimpan);
        }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                                bankAccountColor(jumldata,'red');
                                        }
                        else {
                                                bankAccountColor(jumldata,'#E8F2FC');
                                                dosaveAll(max);
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function saveOperator(no)
{
        userid=document.getElementById('user'+no).innerHTML;
        operator=document.getElementById('operator'+no).options[document.getElementById('operator'+no).selectedIndex].value;
        param='userid='+userid+'&operator='+operator;
    if(userid!='' && operator!='')
          post_response_text('sdm_slaveSaveHOPyOperator.php', param, respon);
    else
          alert('Data not valid');
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                                document.getElementById('operator'+no).style.backgroundColor='red';
                                        }
                        else {
                                                document.getElementById('operator'+no).style.backgroundColor='#E8F2FC';
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function savePyUser()
{
        user=document.getElementById('user').value;
        type=document.getElementById('type').options[document.getElementById('type').selectedIndex].value;
        param='user='+user+'&type='+type;
    if(user!='' && type!='')
        post_response_text('sdm_slaveSavePyHOUser.php', param, respon);
    else
          alert('Data Not valid');

   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                        else {
                                                document.getElementById('tablebody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function delPyUser(uname)
{
	dlt = document.getElementById('dlt').value;
	cnf = document.getElementById('cnf').value;
	cnfhapus = document.getElementById('cnfhapus').value;
   param='uname='+uname;
   //if (confirm(dlt+' ' + uname + ', '+ cnf+'...?')) {
   if (confirm(cnfhapus)) {
        post_response_text('sdm_slaveDeletePyHOUser.php', param, respon);
   }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                        else {
                                                document.getElementById('tablebody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function calculcateTotal(maxC,userid)
{
        limit=parseInt(maxC);
        total=0.00;
        for(d=0;d<=limit;d++)
        {
                sign=document.getElementById('plus'+userid+d).value;
                val=document.getElementById('value'+userid+d).value;
                   while(val.indexOf(",")>-1)
                   {
                    val=val.replace(",","");
                   }
                val=parseFloat(val); 
                if(sign=='1')
                        total=total+val;
                else
                    total=total-val;	  		
        }
        Tl=document.getElementById('total'+userid);
        Tl.value=total;
        change_number(Tl);
}

function calculatePayroll(object,maxC,userid)
{
        calculcateTotal(maxC,userid);
        change_number(object);
        fillTerbilang(userid);
}

//rubah function supaya bisa memberi notifikasi jika menunda pembayaran melebihi maksimum ==Jo 26-01-2017==
function checkDelay(object,maxC,userid,jmangsur,delay,idx,maksdelay)
{
	vals=document.getElementById('value'+userid+idx).value;
	krytundanagsur=document.getElementById('krytundanagsur').value;
	kali=document.getElementById('kali').value;
	tidakbisatundaangsur=document.getElementById('tidakbisatundaangsur').value;
	jmangsur0dansa=document.getElementById('jmangsur0dansa').value;
	if (vals==0 && delay==maksdelay){
		alert(krytundanagsur+' '+delay+' '+kali+', '+tidakbisatundaangsur);
		document.getElementById('value'+userid+idx).value=jmangsur;
		calculatePayroll(object,maxC,userid);
	}
	else if (delay<maksdelay){
		if (vals==0 || vals==jmangsur){
			
		}
		else {
			alert(jmangsur0dansa);
			document.getElementById('value'+userid+idx).value=jmangsur;
		}
		calculatePayroll(object,maxC,userid);
		
	}
	else {
		calculatePayroll(object,maxC,userid);
	}
       
}


function change_number(object)
{
           while(object.value.indexOf(",")>-1)
           {
                object.value=object.value.replace(",","");
           }
        //number format cleared and verified
        str=object.value.replace(".","");
        //rex=/[^0-9]/;        
		rex=/^[+-][^0-9]/;//rubah regex ==Jo 26-01-2017==
        if ((!str.match(rex)) || (parseFloat(str)==0.00)) {
                        try{
                                object.value=_formatted(object);
                                }
                        catch(ex)
                                {
                                alert(ex.toString());
                                }
        }
        else {
                if (object.value.length > 0) {
                        alert('Wrong number');
                        object.focus();
                }		
        }
}

function saveBSalary(userid,compId,valObj)
{
        value=document.getElementById(valObj).value;
           while(value.indexOf(",")>-1)
           {
                value=value.replace(",","");
           }	
        param='userid='+userid+'&component='+compId+'&value='+value;
        document.getElementById(valObj).style.backgroundColor='#FFA500';
        post_response_text('sdm_slaveSaveHOBSalaryDetail.php', param, respon);
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                            document.getElementById(valObj).style.backgroundColor='#FF4444';	
                                        }
                        else {
                                                document.getElementById(valObj).style.backgroundColor='#EDEDED';
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		   
}

maxComponent=0;
itemComponent=-1;
//tambah fungsi untuk save all gaji pokok == Jo 22-12-2016==
indks=1;
function saveAllBSalary(max)
{
	cnfsimpanall=document.getElementById('cnfsimpanall').value;
	if (confirm(cnfsimpanall)){
		document.getElementById('btsvall').disabled=true;
		ctdt=document.getElementById('count'+indks).value;
		saveMonthlyBSalaries(indks,ctdt,max);
	}
	
}

function saveAllBSalaries(max)
{
	indks++;
	ctdt=document.getElementById('count'+indks).value;
		saveMonthlyBSalaries(indks,ctdt,max);
	
}

function saveMonthlyBSalaries(indks,rcount,max)
{
	itemComponent=-1;
	maxComponent=rcount;   
	doPostBsalaries(indks,max);
   
}
function doPostBsalaries(indks,max)
{
	
	itemComponent+=1;
	document.getElementById('btn'+indks+itemComponent).disabled=true;
	value=document.getElementById('value'+indks+itemComponent).value;
	component=document.getElementById('component'+indks+itemComponent).value;
	userid=document.getElementById('kryid'+indks+itemComponent).value;
	   while(value.indexOf(",")>-1)
	   {
			value=value.replace(",","");
	   }
	   
	    param='userid='+userid+'&component='+component+'&value='+value;
		
        document.getElementById('value'+indks+itemComponent).style.backgroundColor='#FFA500';
		
        post_response_text('sdm_slaveSaveHOBSalaryDetail.php', param, respon);
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                            document.getElementById('value'+indks+itemComponent).style.backgroundColor='#FF4444';	
                                        }
                        else {
                                     document.getElementById('value'+indks+itemComponent).style.backgroundColor='#EDEDED';
									 
									 if (maxComponent == itemComponent) {
												location.href='#value'+indks+itemComponent;
												 document.getElementById('value'+indks+itemComponent).style.backgroundColor='#EDEDED';
												 //aktifkan button ketika response selesai	
												if (indks==max){
														document.getElementById('btsvall').disabled=false;
														location.href='#';
														location.reload();
												}
												else {
													//indks++;
													saveAllBSalaries(max);
												}							
										}
										else {
												doPostBsalaries(indks,max);
										}
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }
			
			
		
	
}

function editAngsuran(ids,karyawanid,jenis,total,xstart,jlhbln,aktf)
{
        userid=document.getElementById('userid');
        idx   =document.getElementById('idx');
        start =document.getElementById('start');
        active=document.getElementById('active');

        for(x=0;x<userid.length;x++)
        {
                if(userid.options[x].value==karyawanid)
                 userid.options[x].selected=true;
        }

        for(x=0;x<idx.length;x++)
        {
                if(idx.options[x].value==jenis)
                 idx.options[x].selected=true;
        }

        for(x=0;x<start.length;x++)
        {
                if(start.options[x].value==xstart)
                 start.options[x].selected=true;
        }
        for(x=0;x<active.length;x++)
        {
                if(active.options[x].value==aktf)
                 active.options[x].selected=true;
        }
        document.getElementById('method').value='update';	
        document.getElementById('ids').value=ids;	
        lama  =document.getElementById('lama').value=jlhbln;
        total =document.getElementById('total').value=total;		
}
function delAngsuran(ids)
{
	cnfhapus=document.getElementById('cnfhapus').value;
	param='ids='+ids+'&method=delete';
	if (confirm(cnfhapus)) {
			post_response_text('sdm_slaveSaveAngsuran.php', param, respon);
	}	
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                  document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function cancelAngsuran()
{
        document.getElementById('lama').value=0;
        document.getElementById('total').value=0;
        document.getElementById('method').value='insert';
}

function saveAngsuran()
{
		ids=document.getElementById('ids').value;
        userid=document.getElementById('userid').options[document.getElementById('userid').selectedIndex].value;
        idx   =document.getElementById('idx').options[document.getElementById('idx').selectedIndex].value;
        total =document.getElementById('total').value;
        start =document.getElementById('start').options[document.getElementById('start').selectedIndex].value;
        lama  =document.getElementById('lama').value;
        active=document.getElementById('active').options[document.getElementById('active').selectedIndex].value;
        method=document.getElementById('method').value;
        cnfsimpan=document.getElementById('cnfsimpan').value;
           while(total.indexOf(",")>-1)
           {
                total=total.replace(",","");
           }
           f=total;
           total=parseFloat(total);
           g=lama;
           lama=parseInt(lama);
           if(total<100.00 || f=='' || lama<1 || g=='')
           {
                alert('Total installment must greater than 0');
           }

           else
           {
                param='userid='+userid+'&idx='+idx+'&ids='+ids+'&total='+total;
                param+='&start='+start+'&lama='+lama+'&active='+active;
                param+='&method='+method;
                if (confirm(cnfsimpan)) {
                        post_response_text('sdm_slaveSaveAngsuran.php', param, respon);
                }
           }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('method').value='insert';
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		   	
}

function setPayrollPeriod()
{
period=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
periodTx=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].text;
alertsure=document.getElementById('alertsure').value;
setprd=document.getElementById('setprd').value;
param='period='+period;
        if (confirm(setprd+' '+periodTx+', '+alertsure)) {
                post_response_text('sdm_slaveSavePayrollHOPeriod.php', param, respon);
        }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                //alert(con.responseText);
                                                window.location='sdm_mainCreatePayrollHODetail.php';
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}
function setBonusPeriod()
{
period=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
periodTx=document.getElementById('periodegaji').options[document.getElementById('periodegaji').selectedIndex].value;
param='period='+period+'&periodegaji='+periodTx;
alertsure=document.getElementById('alertsure').value;
setprd=document.getElementById('setprd').value;
        if (confirm(setprd+' '+periodTx+', '+alertsure)) {
                post_response_text('sdm_slaveSaveHOBonusPeriod.php', param, respon);
        }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                //alert(con.responseText);
                                                window.location='sdm_mainCreateBonusHODetail.php';
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function setTHRPeriod()
{
period=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
tglthr=document.getElementById('tglthr').value;
param='period='+period+'&tglthr='+tglthr;

  post_response_text('sdm_slaveSaveTHRHOPeriod.php', param, respon);
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                //alert(con.responseText);
                                                window.location='sdm_mainCreateTHRHO.php';
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function fillTerbilang(userid)
{
        obj=document.getElementById('total'+userid);
        rupiahkan(obj,'terbilang'+userid);   
}	



maxComponent=0;
itemComponent=-1;//id component start from 0 (begining of an array
replace='no';
function saveMonthlySalary(userid,rcount)
{
	cnfsimpan=document.getElementById('cnfsimpan').value;
    replace='no';
    itemComponent=-1;
        maxComponent=rcount;
        fillTerbilang(userid);	
        if (confirm(cnfsimpan)) {
                document.getElementById('btn'+userid).disabled=true;
				itr = 0;
                doPostMsalary(userid);
        }
}

function doPostMsalary(userid)
{
	cnfganti=document.getElementById('cnfganti').value;
	itemComponent+=1;
	val=document.getElementById('value'+userid+itemComponent).value;
	component=document.getElementById('component'+userid+itemComponent).value;
	plus=document.getElementById('plus'+userid+itemComponent).value;
	terbilang=document.getElementById('terbilang'+userid).innerHTML;
	   while(val.indexOf(",")>-1)
	   {
			val=val.replace(",","");
	   }
	param='val='+val+'&component='+component+'&plus='+plus+'&userid='+userid+'&iterasi='+itr+'&terbilang='+terbilang;   	
	post_response_text('sdm_slaveMonthlyPayrollHO.php', param, respon);
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                                document.getElementById(userid).style.backgroundColor='red';	
                                                 //aktifkan button ketika response selesai	
                                                 document.getElementById('btn'+userid).disabled=false;
                                        }
                        else {
                                           if (con.responseText.lastIndexOf('Double') > -1) {
                                                    param='val='+val+'&component='+component+'&plus='+plus+'&userid='+userid+'&iterasi='+itr+'&replace=yes&terbilang='+terbilang;
                                                        if(replace=='no')
                                                        {
                                                           if (confirm(cnfganti)) {
                                                                replace = 'yes';
                                                                post_response_text('sdm_slaveMonthlyPayrollHO.php', param, respon);
                                                                document.getElementById('btn'+userid).disabled=true;
                                                           }
                                                        }
                                                        else
                                                        {
                                                          post_response_text('sdm_slaveMonthlyPayrollHO.php', param, respon);
                                                          document.getElementById('btn'+userid).disabled=true;
                                                        }
                                           }
                                           else {
                                                if (maxComponent == itemComponent) {
                                                        document.getElementById(userid).style.backgroundColor = 'green';
                                                         //aktifkan button ketika response selesai	
                                                         document.getElementById('btn'+userid).disabled=false;
														if (itr==0){
															itemComponent=-1;
															doPostMsalary(userid);
															itr	=1;														
														}
														else {
															location.reload();
														}							
                                                }
                                                else {
                                                        doPostMsalary(userid);
                                                }
                                           }
                                }	
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}
//tambah fungsi untuk save all ==Jo 13-12-2016==
idx=1;
function saveAllSalary(max)
{
	cnfsimpanall=document.getElementById('cnfsimpanall').value;
	if (idx==1){
		if (confirm(cnfsimpanall)){
			document.getElementById('btsvall').disabled=true;
			kryid=document.getElementById('kryid'+idx).value;
			ctdt=document.getElementById('count'+idx).value;
			saveMonthlySalaries(kryid,ctdt,max);
		}
	}
	else {
		kryid=document.getElementById('kryid'+idx).value;
		ctdt=document.getElementById('count'+idx).value;
		saveMonthlySalaries(kryid,ctdt,max);
	}
}

function saveMonthlySalaries(userid,rcount,max)
{
	replace='no';
	itemComponent=-1;
	maxComponent=rcount;
	fillTerbilang(userid);	
   document.getElementById('btn'+userid).disabled=true;
	itr = 0;
	doPostMsalaries(userid,max);
   
}
function doPostMsalaries(userid,max)
{
	itemComponent+=1;
	val=document.getElementById('value'+userid+itemComponent).value;
	component=document.getElementById('component'+userid+itemComponent).value;
	plus=document.getElementById('plus'+userid+itemComponent).value;
	terbilang=document.getElementById('terbilang'+userid).innerHTML;
	   while(val.indexOf(",")>-1)
	   {
			val=val.replace(",","");
	   }
	param='val='+val+'&component='+component+'&plus='+plus+'&userid='+userid+'&iterasi='+itr+'&terbilang='+terbilang;   	
	post_response_text('sdm_slaveMonthlyPayrollHO.php', param, respon);
   function respon(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);
										document.getElementById(userid).style.backgroundColor='red';	
										 //aktifkan button ketika response selesai	
										 document.getElementById('btn'+userid).disabled=false;
								}
				else {
								   if (con.responseText.lastIndexOf('Double') > -1) {
											param='val='+val+'&component='+component+'&plus='+plus+'&userid='+userid+'&iterasi='+itr+'&replace=yes&terbilang='+terbilang;
												if(replace=='no')
												{
												   replace = 'yes';
													post_response_text('sdm_slaveMonthlyPayrollHO.php', param, respon);
													document.getElementById('btn'+userid).disabled=true;
												}
												else
												{
												  post_response_text('sdm_slaveMonthlyPayrollHO.php', param, respon);
												  document.getElementById('btn'+userid).disabled=true;
												}
								   }
								   else {
										if (maxComponent == itemComponent) {
												location.href='#'+userid;
												document.getElementById(userid).style.backgroundColor = 'green';
												 //aktifkan button ketika response selesai	
												 document.getElementById('btn'+userid).disabled=false;
												if (itr==0){
													itemComponent=-1;
													doPostMsalaries(userid,max);
													itr	=1;														
												}
												else {
													if (idx==max){
														document.getElementById('btsvall').disabled=false;
														location.href='#';
														location.reload();
													}
													else {
														idx++;
														saveAllSalary(max);
													}
												}							
										}
										else {
												doPostMsalaries(userid,max);
										}
								   }
						}	
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
    }	
	
}
/*function setJmsPorsi()
{
        karyawan=trim(document.getElementById('karyawan').value);
        perusahaan=(document.getElementById('perusahaan').value);
        pphjms=(document.getElementById('pphjms').value);

		
        if (karyawan == '' || perusahaan =='' || pphjms ==''){
			alert('Data harus diisi dengan lengkap')
		}
        else
        {
                param='karyawan='+karyawan+'&perusahaan='+perusahaan+'&pphjms='+pphjms;
                if (confirm('Saving, Are you sure..?')) {
                        post_response_text('sdm_slaveSaveJmsHOSetting.php', param, respon);
                }
        }
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('karyawan').disabled=true;
                                                document.getElementById('perusahaan').disabled=true;
                                                alert('Saved');	
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}*/
// JO 20161027
function setJkk(){
	jkkid=document.getElementById('jkks').options[document.getElementById('jkks').selectedIndex].value;	
	cnfsimpan = document.getElementById('cnfsimpan').value;
	dtsimpan = document.getElementById('dtsimpan').value;
	param='jkkid='+jkkid+'&isjkk=1';
	if (confirm(cnfsimpan)) {
			post_response_text('sdm_slaveSaveJmsHOSetting.php', param, respon);
	}
	
	function respon(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);	
				}
				else {
						document.getElementById('jkks').disabled=true;
						alert(dtsimpan);
						
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
    }
}

function setBpjs(type, seq, ids1, ids2)
{	
	cnfsimpan = document.getElementById('cnfsimpan').value;
	dttdklk = document.getElementById('dttdklk').value;
	dtsimpan = document.getElementById('dtsimpan').value;
	if (type == '1'){
		karyawan=trim(document.getElementById('karyawan'+seq).value);
		maxkaryawan=trim(document.getElementById('maxkaryawan'+seq).value);
		perusahaan=trim(document.getElementById('perusahaan'+seq).value);
		maxperusahaan=trim(document.getElementById('maxperusahaan'+seq).value);
		
		if (karyawan=='' || maxkaryawan=='' || perusahaan=='' || maxperusahaan ==''){
			alert (dttdklk);
		}
		else {
			param='type='+type+'&ids1='+ids1+'&ids2='+ids2+'&karyawan='+karyawan+'&maxkaryawan='+maxkaryawan+'&perusahaan='+perusahaan+'&maxperusahaan='+maxperusahaan;
			if (confirm(cnfsimpan)) {
					post_response_text('sdm_slaveSaveJmsHOSetting.php', param, respon);
			}
		}
		
		
	}
	else if (type == '2'){
		perusahaan=trim(document.getElementById('perusahaan'+seq).value);
		maxperusahaan=trim(document.getElementById('maxperusahaan'+seq).value);
		
		if (perusahaan=='' || maxperusahaan ==''){
			alert (dttdklk);
		}
		else {
			param='type='+type+'&ids2='+ids2+'&perusahaan='+perusahaan+'&maxperusahaan='+maxperusahaan;
			if (confirm(cnfsimpan)) {
					post_response_text('sdm_slaveSaveJmsHOSetting.php', param, respon);
			}
		}
		
		
	}
        
   function respon(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);	
				}
				else {
						if (type == '1'){
							document.getElementById('karyawan'+seq).disabled=true;
							document.getElementById('maxkaryawan'+seq).disabled=true;
							document.getElementById('perusahaan'+seq).disabled=true;
							document.getElementById('maxperusahaan'+seq).disabled=true;
						}
						else if (type=='2'){
							document.getElementById('perusahaan'+seq).disabled=true;
							document.getElementById('maxperusahaan'+seq).disabled=true;
							
						}
						alert(dtsimpan);
						
				}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
    }	
}

function showAngsuran(val)
{
	bln=document.getElementById('bln').options[document.getElementById('bln').selectedIndex].value;
	saktif=document.getElementById('saktif').value;
	stdaktif=document.getElementById('stdaktif').value;
	sblunas=document.getElementById('sblunas').value;
	slunas=document.getElementById('slunas').value;
	if (bln!=''){
		sbl=bln;
	}
	else {
		sbl='';
	}
	switch(trim(val)){
			case slunas:
				document.getElementById('caption').innerHTML=document.getElementById('lns').value+' '+sbl;
				//document.getElementById('bln').options[0].selected=true;
			break;	
			case sblunas:
				document.getElementById('caption').innerHTML=document.getElementById('blns').value+' '+sbl;
				//document.getElementById('bln').options[0].selected=true;
			break;
			case saktif:
				document.getElementById('caption').innerHTML=document.getElementById('act').value+' '+sbl;
				//document.getElementById('bln').options[0].selected=true;
			break;
			case sblunas:
				document.getElementById('caption').innerHTML=document.getElementById('nact').value+' '+sbl;
				//document.getElementById('bln').options[0].selected=true;
			break;
			default:
			document.getElementById('caption').innerHTML='';
			/*document.getElementById('caption').innerHTML=document.getElementById('prd').value+' '+val.substr(5,2)+'-'+val.substr(0,4);	
			document.getElementById('lunas').options[0].selected=true;*/			
	}
	
	blns=bln.substr(0,4)+'-'+bln.substr(5,2);
	param='string='+val+'&prd='+blns;
	document.getElementById('val').value=val;
	document.getElementById('prds').value=blns;
	post_response_text('sdm_slaveShowAngsuran.php', param, respon);
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function showAngsuranbln(val)
{
		tipe=document.getElementById('lunas').options[document.getElementById('lunas').selectedIndex].value;	
		if (tipe!=''){
			 document.getElementById('caption').innerHTML=document.getElementById('prd').value+' '+val.substr(5,2)+'-'+val.substr(0,4)+ ' '+tipe;	
		}
		else {
			 document.getElementById('caption').innerHTML=document.getElementById('prd').value+' '+val.substr(5,2)+'-'+val.substr(0,4);	
		}
        param='prd='+val+'&string='+tipe;
        document.getElementById('val').value=tipe;
        document.getElementById('prds').value=val;
        post_response_text('sdm_slaveShowAngsuran.php', param, respon);
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
							
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function getJmsvalue(val)
{
        document.getElementById('caption').innerHTML=val.substr(5,2)+'-'+val.substr(0,4);
        if(trim(val)=='')
        {}
        else
        {
                param='val='+trim(val);
            post_response_text('sdm_slaveShowJamsostekHO.php', param, respon);		
        }
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function convertJmsExcel()
{
    val=document.getElementById('caption').innerHTML;
        document.getElementById('ifrm').src='sdm_svlaveJmsHOToExcel.php?periode='+val;	
}
function getBPJSKesVal(val)
{
        document.getElementById('caption').innerHTML=val.substr(5,2)+'-'+val.substr(0,4);
        if(trim(val)=='')
        {}
        else
        {
                param='val='+trim(val);
            post_response_text('sdm_slaveShowBPJSKes.php', param, respon);		
        }
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function convertBPJSKesExcel()
{
    val=document.getElementById('caption').innerHTML;
        document.getElementById('ifrm').src='sdm_slaveBPJSKesTOExcel.php?periode='+val;	
}

function getBPJSTKVal(val)
{
        document.getElementById('caption').innerHTML=val.substr(5,2)+'-'+val.substr(0,4);
        if(trim(val)=='')
        {}
        else
        {
                param='val='+trim(val);
            post_response_text('sdm_slaveShowBPJSTK.php', param, respon);		
        }
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function convertBPJSTKExcel()
{
    val=document.getElementById('caption').innerHTML;
        document.getElementById('ifrm').src='sdm_slaveBPJSTKTOExcel.php?periode='+val;	
}

function replaceComma(val)
{
        while(val.indexOf(",")>-1)
           {
                val=val.replace(",","");
           }	
   return val;	   
}
function savePTKP()
{
        single=document.getElementById('ptkps').value;
                single=replaceComma(single);
		
        tk1=document.getElementById('ptkptk1').value;
                tk1=replaceComma(tk1);
        tk2=document.getElementById('ptkptk2').value;
                tk2=replaceComma(tk2);
        tk3=document.getElementById('ptkptk3').value;
                tk3=replaceComma(tk3);
        k0=document.getElementById('ptkp0').value;	
                k0=replaceComma(k0);
        k1=document.getElementById('ptkp1').value;	
                k1=replaceComma(k1);	
        k2=document.getElementById('ptkp2').value;
                k2=replaceComma(k2);		
        k3=document.getElementById('ptkp3').value;
                k3=replaceComma(k3);
    param='single='+single+'&tk1='+tk1+'&tk2='+tk2+'&tk3='+tk3+'&k0='+k0+'&k1='+k1+'&k2='+k2+'&k3='+k3;
        post_response_text('sdm_slaveSavePph21HOptkp.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                   alert('Tersimpan');
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }					
}

function saveKontribusi()
{
	
	b1=document.getElementById('bawah1').value;
	b1=replaceComma(b1);
	b2=document.getElementById('bawah2').value;
	b2=replaceComma(b2);
	b3=document.getElementById('bawah3').value;
	b3=replaceComma(b3);		
	b4=document.getElementById('bawah4').value;
	b4=replaceComma(b4);
	a1=document.getElementById('atas1').value;
	a1=replaceComma(a1);
	a2=document.getElementById('atas2').value;
	a2=replaceComma(a2);
	a3=document.getElementById('atas3').value;
	a3=replaceComma(a3);
	a4=document.getElementById('atas4').value;
	a4=replaceComma(a4);

	p1=document.getElementById('persen1').value;
	p1=replaceComma(p1);
	p2=document.getElementById('persen2').value;
	p2=replaceComma(p2);
	p3=document.getElementById('persen3').value;
	p3=replaceComma(p3);
	p4=document.getElementById('persen4').value;
	p4=replaceComma(p4);
	ids1=document.getElementById('ids1').value;
	ids2=document.getElementById('ids2').value;
	ids3=document.getElementById('ids3').value;
	ids4=document.getElementById('ids4').value;

       
       
    param='b1='+b1+'&b2='+b2+'&b3='+b3+'&b4='+b4;
	param+='&a1='+a1+'&a2='+a2+'&a3='+a3+'&a4='+a4;
	param+='&p1='+p1+'&p2='+p2+'&p3='+p3+'&p4='+p4;
	param+='&ids1='+ids1+'&ids2='+ids2+'&ids3='+ids3+'&ids4='+ids4;
	post_response_text('sdm_slaveSavePph21HOKontribusi.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                 alert('Tersimpan');
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function savePph21ByJabatan()
{
        persen=document.getElementById('persen').value;
        persen=replaceComma(persen);
        max	  =document.getElementById('max').value;
        max	  =replaceComma(max);	
		cfword	=document.getElementById('cfword').value;
        param='persen='+persen+'&max='+max;
        if (max == '' || persen == '') {
                alert('Data inconsistent');
        }
        else {
                if (confirm(cfword)) 
                        post_response_text('sdm_slaveSavePph21HOByJabatan.php', param, respon);
        } 
	function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                alert('Saved');
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	

}
//Jo ======================= 29-09-2016 ====================================
function updateGrossUp(){
	cbx = document.getElementById('gucb').checked;
	 if (cbx==true){
		 vals=1;
	 }
	 else {
		vals=0;
	 }
	 param='vals='+vals;
	 post_response_text('sdm_slaveSavePph21GrossUp.php', param, respon);
	 function respon(){
		if (con.readyState == 4) {
			if (con.status == 200) {
				busy_off();
				if (!isSaveResponse(con.responseText)) {
					alert('ERROR TRANSACTION,\n' + con.responseText);	
								}
				else {
						if (vals==0){
							alert('PPh21 Berhasil diset untuk tidak menggunakan Gross Up');
						}
						else {
							alert('PPh21 Berhasil diset untuk menggunakan Gross Up');
						}
						
					}
			}
			else {
				busy_off();
				error_catch(con.status);
			}
		}
	}
}
//Jo ======================= 29-09-2016 ====================================

function savePPh21Component(obj,id)
{
        if(obj.checked)
          to=1;
        else
          to=0;
   param='to='+to+'&idx='+id;  
   post_response_text('sdm_slaveSavePph21HOComponen.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                alert('Saved');
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		    
}

function showPPh21Monthly()
{
        //get Options
        regular ='yes';
        thr		='yes';
        jaspro	='yes';
        jmsperusahaan='yes';
        if(document.getElementById('regular').checked==false)
           regular ='no';
        if(document.getElementById('thr').checked==false)
           thr	   ='no';
        if(document.getElementById('jaspro').checked==false)
           jaspro  ='no';
        if(document.getElementById('jmsperusahaan').checked==false)
           jmsperusahaan  ='no';	   
        periode=document.getElementById('bulanan').options[document.getElementById('bulanan').selectedIndex].value;

        param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan;
    post_response_text('sdm_slaveShowPph21HOBulanan.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbody').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	   	
}

function showPPh21Yearly()
{
        //get Options
        regular ='yes';
        thr		='yes';
        jaspro	='yes';
        jmsperusahaan='yes';
        if(document.getElementById('regular').checked==false)
           regular ='no';
        if(document.getElementById('thr').checked==false)
           thr	   ='no';
        if(document.getElementById('jaspro').checked==false)
           jaspro  ='no';
        if(document.getElementById('jmsperusahaan').checked==false)
           jmsperusahaan  ='no';	   
        periode=document.getElementById('tahun').options[document.getElementById('tahun').selectedIndex].value;

        param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan;
    post_response_text('sdm_slaveShowPph21HOYearly.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbodyYear').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function convertPPh21Excel(jenis)
{
        //get Options
        regular ='yes';
        thr		='yes';
        jaspro	='yes';
        jmsperusahaan='yes';
        if(document.getElementById('regular').checked==false)
           regular ='no';
        if(document.getElementById('thr').checked==false)
           thr	   ='no';
        if(document.getElementById('jaspro').checked==false)
           jaspro  ='no';
        if(document.getElementById('jmsperusahaan').checked==false)
           jmsperusahaan  ='no';	   
        if(jenis=='bulan')
        {
        jenis='bulanan';
                periode=document.getElementById('bulanan').options[document.getElementById('bulanan').selectedIndex].value;		
                param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan+'&jenis='+jenis;
                document.getElementById('ifrm').src='sdm_slavePPh21HOToExcel.php?'+param;
        }
        else if (jenis=='tahun')
        {
        jenis='tahunan';
                periode=document.getElementById('tahun').options[document.getElementById('tahun').selectedIndex].value;		
                param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan+'&jenis='+jenis;
                document.getElementById('ifrm1').src='sdm_slavePPh21HOToExcel.php?'+param;
        }
		else if(jenis=='bonus')
        {
        jenis='bonus';
                periode=document.getElementById('bulanans').options[document.getElementById('bulanans').selectedIndex].value;		
                param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan+'&jenis='+jenis;
                document.getElementById('ifrmb').src='sdm_slavePPh21HOToExcel.php?'+param;
        }
		else if(jenis=='thr')
        {
        jenis='thr';
                periode=document.getElementById('bulanant').options[document.getElementById('bulanant').selectedIndex].value;		
                param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan+'&jenis='+jenis;
                document.getElementById('ifrmt').src='sdm_slavePPh21HOToExcel.php?'+param;
        }
}

function showPPh21Bonus()
{
        //get Options
        regular ='yes';
        thr		='yes';
        jaspro	='yes';
        jmsperusahaan='yes';
        if(document.getElementById('regular').checked==false)
           regular ='no';
        if(document.getElementById('thr').checked==false)
           thr	   ='no';
        if(document.getElementById('jaspro').checked==false)
           jaspro  ='no';
        if(document.getElementById('jmsperusahaan').checked==false)
           jmsperusahaan  ='no';	   
        periode=document.getElementById('bulanans').options[document.getElementById('bulanans').selectedIndex].value;

        param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan;
    post_response_text('sdm_slaveShowPph21Bonus.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbodyBonus').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	   	
}

function showPPh21Thr()
{
        //get Options
        regular ='yes';
        thr		='yes';
        jaspro	='yes';
        jmsperusahaan='yes';
        if(document.getElementById('regular').checked==false)
           regular ='no';
        if(document.getElementById('thr').checked==false)
           thr	   ='no';
        if(document.getElementById('jaspro').checked==false)
           jaspro  ='no';
        if(document.getElementById('jmsperusahaan').checked==false)
           jmsperusahaan  ='no';	   
        periode=document.getElementById('bulanant').options[document.getElementById('bulanant').selectedIndex].value;

        param='periode='+periode+'&regular='+regular+'&thr='+thr+'&jaspro='+jaspro+'&jmsperusahaan='+jmsperusahaan;
    post_response_text('sdm_slaveShowPph21THR.php', param, respon);		
  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('tbodyThr').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	   	
}

function pyPreview()
{
        periode=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
        tipe=document.getElementById('tipe').options[document.getElementById('tipe').selectedIndex].value;
        operator=document.getElementById('user').options[document.getElementById('user').selectedIndex].value;
        snbk=document.getElementById('snbk').options[document.getElementById('snbk').selectedIndex].value;
        jnby=document.getElementById('jnby').options[document.getElementById('jnby').selectedIndex].value;
		
        if(operator=='')
           username='';
        else
           username=operator;   
        param='periode='+periode+'&tipe='+tipe+'&username='+username+'&sandibank='+snbk+'&jenisbiaya='+jnby;
		//alert(param);
        post_response_text('sdm_slaveShowPayrollHOPrint.php', param, respon);		

  function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {
                                                document.getElementById('output').innerHTML=con.responseText;
                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }
}

function pyPreviewExcel()
{
        periode=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
        tipe=document.getElementById('tipe').options[document.getElementById('tipe').selectedIndex].value;
        operator=document.getElementById('user').options[document.getElementById('user').selectedIndex].value;
		jnby=document.getElementById('jnby').options[document.getElementById('jnby').selectedIndex].value;
        if(operator=='')
           username='';
        else
           username=operator;   
        param='periode='+periode+'&tipe='+tipe+'&username='+username+'&jenisbiaya='+jnby;

        document.getElementById('output').innerHTML="<iframe src=\"sdm_slaveShowPayrollHOPrintExcel.php?"+param+"\" frameborder=0></iframe>";
}


function pPDF(event)
{
        periode=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
        tipe=document.getElementById('tipe').options[document.getElementById('tipe').selectedIndex].value;
        operator=document.getElementById('user').options[document.getElementById('user').selectedIndex].value;
		snbk=document.getElementById('snbk').options[document.getElementById('snbk').selectedIndex].value;
        jnby=document.getElementById('jnby').options[document.getElementById('jnby').selectedIndex].value;
        issbn=document.getElementById('issbn').checked;
		if(issbn==true){
			issbns=1;
		}
		else {
			issbns=0;
		}
        if(operator=='')
           username='';
        else
           username=operator; 	
        printPyPDF(periode,tipe,event,username,issbns,snbk,jnby);
}
function angsuranPreviewExcel()
{
	val=document.getElementById('val').value;
	judul=document.getElementById('cappdf').value;
	param='string='+val;
	tujuan = 'sdm_slave_print_angsuran_excel.php?'+param;	
//display window
	
   title=judul;
   width='1000';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,'event');	
}


function angsuranPDF(ev)
{
        val=document.getElementById('val').value;
        prd=document.getElementById('prds').value;
		judul=document.getElementById('cappdf').value;
        param='string='+val+'&prd='+val;
        tujuan = 'sdm_slave_print_angsuran_pdf.php?'+param;	
 //display window
	
   title=judul;
   width='1000';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);	
}
function printPyPDF(periode,tipe,evt,username,issbns,snbk,jnby){
    pos = new Array();
    pos = getMouseP(evt);
        win="<img src=images/closebig.gif align=right onclick=hideById('pdf'); title='Close detail' class=closebtn onmouseover=\"this.src='images/closebigon.gif';\" onmouseout=\"this.src='images/closebig.gif';\"><br><br>";
        win+="<iframe height=450px width=100%  frameborder=0 src='sdm_slavePrintPayrollHOPDF.php?periode="+periode+"&tipe="+tipe+"&username="+username+"&issbns="+issbns+"&sandibank="+snbk+"&jenisbiaya="+jnby+"'></iframe>";
    document.getElementById('pdf').innerHTML = win;
    document.getElementById('pdf').style.top = pos[1] + 'px';
    document.getElementById('pdf').style.left = '75px';
    document.getElementById('pdf').style.display = '';	
	document.getElementById('pdf').style.zIndex = '100';	
}



function printBank(event,bank)
{
        periode=document.getElementById('periode').options[document.getElementById('periode').selectedIndex].value;
        tipe=document.getElementById('tipe').options[document.getElementById('tipe').selectedIndex].value;	
        operator=document.getElementById('user').options[document.getElementById('user').selectedIndex].value;
        if(operator=='')
           username='';
        else
           username=operator; 	
        printBankExcel(periode,event,bank,username)
}

function printBankExcel(periode,event,bank,username){
    pos = new Array();
    pos = getMouseP(event);
        tgltrf=prompt("Transfer date:");
        while(trim(tgltrf)=='')
        {
                tgltrf=prompt("Transfer date:");
        }
        win="<img src=images/closebig.gif align=right onclick=hideById('pdf'); title='Close detail' class=closebtn onmouseover=\"this.src='images/closebigon.gif';\" onmouseout=\"this.src='images/closebig.gif';\"><br><br>";
        win+="<iframe height=450px width=100%  frameborder=0 src='sdm_slavePrintPayrollHOBank.php?periode="+periode+"&tipe="+tipe+"&tanggaltrf="+tgltrf+"&username="+username+"'></iframe>"
    document.getElementById('pdf').innerHTML = win;
    document.getElementById('pdf').style.top = pos[1] + 'px';
    document.getElementById('pdf').style.left = '75px';
    document.getElementById('pdf').style.display = '';	
}

function thrMasaKrjMinSetup()
{
		val=document.getElementById('mininalhari').value
        param='action=masakerja&id='+val;
		post_response_text('sdm_slaveTHRHOSetup.php', param, respon);	
		function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {

                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}



function thrSetup(obj,val)
{
        if(obj.checked)
        {
                param='action=insert&id='+val;
        }
        else
        {
                param='action=delete&id='+val;
        }

        post_response_text('sdm_slaveTHRHOSetup.php', param, respon);	
function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {

                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

curRow=0;
function saveTHR(x)
{
        curRow=0;
        if(confirm('Saving THR, are you sure..?'))
           loopTHR(x);
}

function saveBonus(x)
{
        curRow=0;
        if(confirm('Saving Bonus, are you sure..?'))
           loopBonus(x);
}

function loopTHR(x)
{
        curRow+=1;
        loadTerbilang(document.getElementById('thr'+curRow),curRow,'');
        userid=document.getElementById('userid'+curRow).innerHTML;
        val=document.getElementById('thr'+curRow).value;
        terbil=document.getElementById('terbilang'+curRow).innerHTML;
           while(val.indexOf(",")>-1)
           {
            val=val.replace(",","");
           }	
   param='userid='+userid+'&val='+val+'&terbilang='+terbil;
   post_response_text('sdm_slaveSaveTHRHO.php', param, respon);	
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                                document.getElementById('thr'+curRow).style.backgroundColor='red';
                                        }
                        else {
                                                document.getElementById('thr'+curRow).style.backgroundColor='lightblue';
                                    if(curRow<=x)
                                                {
                                                        loopTHR(x);
                                                }
                                                else
                                                {
                                                        alert('All Saved');
                                                }
                                        }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function loopBonus(x)
{
        curRow+=1;
        loadTerbilang(document.getElementById('bns'+curRow),curRow,'');
        userid=document.getElementById('userid'+curRow).innerHTML;
        val=document.getElementById('bns'+curRow).value;
        terbil=document.getElementById('terbilang'+curRow).innerHTML;
           while(val.indexOf(",")>-1)
           {
            val=val.replace(",","");
           }	
   param='userid='+userid+'&val='+val+'&terbilang='+terbil;
   post_response_text('sdm_slaveSaveBonusHO.php', param, respon);	
   function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        document.getElementById('bns'+curRow).style.backgroundColor='red';
                                        }
                        else {
                                                document.getElementById('bns'+curRow).style.backgroundColor='lightblue';
                                    if(curRow<=x)
                                                {
                                                        loopBonus(x);
                                                }
                                                else
                                                {
                                                        alert('All Saved');
                                                }
                                        }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }		
}

function bonusSetup(obj,val)
{
        if(obj.checked)
        {
                param='action=insert&id='+val;
        }
        else
        {
                param='action=delete&id='+val;
        }

        post_response_text('sdm_slaveBonusHOSetup.php', param, respon);	
function respon(){
                if (con.readyState == 4) {
                    if (con.status == 200) {
                        busy_off();
                        if (!isSaveResponse(con.responseText)) {
                            alert('ERROR TRANSACTION,\n' + con.responseText);	
                                        }
                        else {

                                }
                    }
                    else {
                        busy_off();
                        error_catch(con.status);
                    }
                }
            }	
}

function loadTerbilang(obj,row,value)
{
        rupiahkan(obj,'terbilang'+row);
}
