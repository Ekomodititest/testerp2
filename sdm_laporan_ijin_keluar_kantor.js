/**
 * @author Developer
 */

function loadData()
{
        param='proses=loadData';
        tujuan='sdm_slave_laporan_ijin_meninggalkan_kantor.php';
        post_response_text(tujuan, param, respog);

                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                document.getElementById('container').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	

}

function cariBast(num)
{
                param='proses=loadData';
                param+='&page='+num;
                tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                document.getElementById('container').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}
function dtReset()
{
    document.getElementById('karyidCari').value='';
    document.getElementById('jnsCuti').value='';
    loadData();

}
function getCariDt()
{
    kary=document.getElementById('karyidCari').options[document.getElementById('karyidCari').selectedIndex].value;
    jnsCut=document.getElementById('jnsCuti').options[document.getElementById('jnsCuti').selectedIndex].value;
    param='proses=cariData'+'&jnsCuti='+jnsCut+'&karyidCari='+kary;
    tujuan='sdm_slave_laporan_ijin_meninggalkan_kantor.php';
    post_response_text(tujuan, param, respog);

            function respog(){
                    if (con.readyState == 4) {
                            if (con.status == 200) {
                                    busy_off();
                                    if (!isSaveResponse(con.responseText)) {
                                            alert('ERROR TRANSACTION,\n' + con.responseText);
                                    }
                                    else {
                                            document.getElementById('container').innerHTML=con.responseText;
                                    }
                            }
                            else {
                                    busy_off();
                                    error_catch(con.status);
                            }
                    }
            }	
}
function cariData(num)
{
                kary=document.getElementById('karyidCari').options[document.getElementById('karyidCari').selectedIndex].value;
                jnsCut=document.getElementById('jnsCuti').options[document.getElementById('jnsCuti').selectedIndex].value;
                param='proses=cariData'+'&jnsCuti='+jnsCut+'&karyidCari='+kary;
                param+='&page='+num;
                tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                document.getElementById('container').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	
}
function appSetuju(tgl,krywnid)
{
	aldone=document.getElementById('aldone').value;
    tglijin=tgl;
    krywnId=krywnid;
    param='proses=appSetuju'+'&tglijin='+tglijin+'&krywnId='+krywnId+'&stat=1';
    tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                alert(aldone);
                                                loadData();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	

}
function appDitolak(tgl,krywnid)
{
    tglijin=tgl;
    krywnId=krywnid;
    ket=document.getElementById('koments').value;
	aldone=document.getElementById('aldone').value;
    param='proses=appSetuju'+'&tglijin='+tglijin+'&krywnId='+krywnId+'&stat=2'+'&ket='+ket;
    tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                        alert(aldone);
                                        closeDialog();
                                        loadData();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	

}
function showAppTolak(tgl,karywn,ev)
{
		
        title=document.getElementById('alasan').value;
        content="<fieldset><legend>"+title+"</legend>\n\
    <table><tr><td><textarea id=koments onkeypress=return tanpa_kutip(event)></textarea></td></tr><tr><td align=center><button class=mybutton id=dtlForm onclick=appDitolak('"+tgl+"','"+karywn+"')>"+tolak+"</button>";
        width='250';
        height='120';
        showDialog1(title,content,width,height,ev);	
}
function showAppForward(tgl,karywn,ev)
{
		
        //title="Forward Approval";
		titles=document.getElementById('trskpd').value;
        title=titles+": ";
        content="<div id=contentForm></div>";
        width='350';
        height='110';
        showDialog1(title,content,width,height,ev);	
}
function showAppForw(tgl,karywn,ev)
{
    showAppForward(tgl,karywn,ev)
    tglijin=tgl;
    krywnId=karywn;

    param='proses=formForward'+'&tglijin='+tglijin+'&krywnId='+krywnId;
    tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                            document.getElementById('contentForm').innerHTML=con.responseText;
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }

}
function AppForw()
{
    krywnId=document.getElementById('karyaid').value;
    tglijin=document.getElementById('tglIjin').value;
	aldone=document.getElementById('aldone').value;
    ats=document.getElementById('karywanId').options[document.getElementById('karywanId').selectedIndex].value;
    param='proses=forwardData'+'&tglijin='+tglijin+'&krywnId='+krywnId+'&atasan='+ats;
    tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                            alert(aldone);
                                            closeDialog();
                                            loadData();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
}
function printFile(param,tujuan,title,ev)
{
   tujuan=tujuan+"?"+param;  
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev); 	
}
function previewPdf(tgl,karywn,ev)
{
        tglijin=tgl;
        krywnId=karywn;
        param='proses=prevPdf'+'&tglijin='+tglijin+'&krywnId='+krywnId;
        tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php?'+param;	
 //display window
   title='Print PDF';
   width='700';
   height='400';
   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1(title,content,width,height,ev);

}

function detailExcel(ev,tujuan)
{
    width='300';
    height='100';
    content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+'?proses=getExcel'+"'></iframe>"
    showDialog1('Print Excel',content,width,height,ev); 
}

function detailData(ev,tujuan)
{
    width='300';
   height='100';

   content="<iframe frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1('Detail Allocation',content,width,height,ev); 
}

function appSetujuHRD(tgl,krywnid)
{
	aldone=document.getElementById('aldone').value;
    tglijin=tgl;
    krywnId=krywnid;
    param='proses=appSetujuHRD'+'&tglijin='+tglijin+'&krywnId='+krywnId+'&stat=1';
    tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                                alert(aldone);
                                                loadData();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }  
}

function showAppTolakHRD(tgl,karywn,ev)
{
       title=document.getElementById('alasan').value;
        content="<fieldset><legend>"+title+"</legend>\n\
                 <table><tr><td><textarea id=koments onkeypress=return tanpa_kutip(event)></textarea></td></tr><tr><td align=center><button class=mybutton id=dtlForm onclick=appDitolakHRD('"+tgl+"','"+karywn+"')>"+tolak+"</button>";
        width='250';
        height='120';
        showDialog1(title,content,width,height,ev);	
}

function appDitolakHRD(tgl,krywnid)
{
	aldone=document.getElementById('aldone').value;
    tglijin=tgl;
    krywnId=krywnid;
    ket=document.getElementById('koments').value;
    param='proses=appSetujuHRD'+'&tglijin='+tglijin+'&krywnId='+krywnId+'&stat=2'+'&ket='+ket;
    tujuan = 'sdm_slave_laporan_ijin_meninggalkan_kantor.php';

                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        }
                                        else {
                                        alert(aldone);
                                        closeDialog();
                                        loadData();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }	

}
