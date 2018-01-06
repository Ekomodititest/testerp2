/**
 * @author Developer
 */

function ambilAfd(kebun)
{
    param="aksi=getAfd&kodeorg="+kebun;
    tujuan='qc_slave_2laporan.php';
post_response_text(tujuan, param, respog);

    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('afdeling').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }    
}
function ambilBlk(afd)
{
    param="aksi=getBlok&kodeorg="+afd;
    tujuan='qc_slave_2laporan.php';
post_response_text(tujuan, param, respog);

    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('blok').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }       
}
function cekNilai()
{
    kodeorg=document.getElementById('kodeorg');
    kodeorg=kodeorg.options[kodeorg.selectedIndex].value;
    tipe=document.getElementById('tipe');
    tipe=tipe.options[tipe.selectedIndex].value;    
    dari=document.getElementById('dari').value;
    sampai=document.getElementById('sampai').value;    
    afdeling=document.getElementById('afdeling');
    try{
        afdeling=afdeling.options[afdeling.selectedIndex].value;
    }catch (e){
        afdeling=0;
    }
    blok=document.getElementById('blok');
    try{
        blok=blok.options[blok.selectedIndex].value;
    }catch (e){
        blok='';
    }
    if(kodeorg=='')
        alert('Pilih Kebun');
    else if(dari=='')
        alert('Pilih Tanggal');
    else{
    param='kodeorg='+kodeorg+'&afdeling='+afdeling+'&blok='+blok+'&dari='+dari+'&sampai='+sampai+'&aksi=getNilai&tipe='+tipe;
    tujuan='qc_slave_2laporan.php';
    post_response_text(tujuan, param, respog);
    }
    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    
                    document.getElementById('panel').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }		
}

function ambilKaryawan(kodeorg)
{
     param="aksi=getKaryawan&kodeorg="+kodeorg;
    tujuan='qc_slave_2laporan.php';
post_response_text(tujuan, param, respog);

    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('karyawanid').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }      
}

function cekNilaiOrang()
{
    karyawanid=document.getElementById('karyawanid');
    karyawanid=karyawanid.options[karyawanid.selectedIndex].value; 
    kodeorg=document.getElementById('kodeorg1');
    kodeorg=kodeorg.options[kodeorg.selectedIndex].value;
    tipe=document.getElementById('tipe1');
    tipe=tipe.options[tipe.selectedIndex].value;    
    dari=document.getElementById('dariTgl').value;
    sampai=document.getElementById('sampaiTgl').value;    
    if(kodeorg=='')
        alert('Pilih Kebun');
    else if(dari=='')
        alert('Pilih Tanggal');
    else if(karyawanid=='')
        {
            alert('Pilih karyawan');
        }
    else{
    param='kodeorg='+kodeorg+'&dari='+dari+'&sampai='+sampai+'&aksi=getNilaiKaryawan&tipe='+tipe+'&karyawanid='+karyawanid;
    tujuan='qc_slave_2laporan.php';
    post_response_text(tujuan, param, respog);
    }
    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('panel1').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }	    
}
function cekRekap()
{ 
    kodeorg=document.getElementById('kodeorg2');
    kodeorg=kodeorg.options[kodeorg.selectedIndex].value;
    tipe=document.getElementById('tipe2');
    tipe=tipe.options[tipe.selectedIndex].value;    
    dari=document.getElementById('dariTgl2').value;
    sampai=document.getElementById('sampaiTgl2').value;    
    if(kodeorg=='')
        alert('Pilih Kebun');
    else if(dari=='')
        {alert('Pilih Tanggal');}
    else{
    param='kodeorg='+kodeorg+'&dari='+dari+'&sampai='+sampai+'&aksi=getRekapNilai&tipe='+tipe;
    tujuan='qc_slave_2laporan.php';
    post_response_text(tujuan, param, respog);
    }
    function respog(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('panel2').innerHTML=con.responseText;
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }
    }	    
}
function zExcel(ev,tujuan,passParam)
{
	judul='Report Excel';
	//alert(param);	
	var passP = passParam.split('##');
    var param = "";
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }
	param+='&aksi=excel';
	//alert(param);
	printFile(param,tujuan,judul,ev)	
}
function zExcel1(ev,tujuan,passParam)
{
	judul='Report Excel';
	//alert(param);	
	var passP = passParam.split('##');
    var param = "";
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }
	param+='&aksi=excel1';
	//alert(param);
	printFile(param,tujuan,judul,ev)	
}
function zExcel2(ev,tujuan,passParam)
{
	judul='Report Excel';
	//alert(param);	
	var passP = passParam.split('##');
    var param = "";
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }
	param+='&aksi=excel2';
	//alert(param);
	printFile(param,tujuan,judul,ev)	
}
function printFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='250';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}