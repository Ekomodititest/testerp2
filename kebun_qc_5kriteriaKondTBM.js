// JavaScript Document
function cleartab1()
{
    document.getElementById('kode').value='';
    document.getElementById('nama').value='';
    document.getElementById('kode').disabled=false;
    document.getElementById('proses1').value='insert1';
}

function savetab1()
{
    kode=document.getElementById('kode').options[document.getElementById('kode').selectedIndex].value;
    nama=document.getElementById('nama').value;
    proses=document.getElementById('proses1');
    param='kode='+kode+'&nama='+nama;
    param+='&proses='+proses.value;
    //alert(param);
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    //alert(con.responseText);
                    loadtab1();
                    cleartab1();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  	
}

function loadtab1()
{
    param='proses=loadtab1';
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('contain1').innerHTML=con.responseText;
                    loadtab2();
//                    getPekerjaan();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }
}

function filltab1(kode,nama)
{
    document.getElementById('kode').value=kode;
    document.getElementById('nama').value=nama;
    document.getElementById('proses1').value='update1';
    document.getElementById('kode').disabled=true;
}

function deltab1(kode)
{
    param='proses=delete1'+'&kode='+kode;
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    if(confirm("Anda Yakin Ingin Menhapus Data?"))
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    loadtab1();
                }	
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  
}

function getPekerjaan()
{
    param='proses=getPekerjaan';
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);	
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('pekerjaan').innerHTML=con.responseText;
//                    loadtab3();
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }      
}

function savetab2()
{
    pekerjaan=document.getElementById('pekerjaan').options[document.getElementById('pekerjaan').selectedIndex].value;
    kelas=document.getElementById('kelas').value;
    bobot=document.getElementById('bobot').value;
    proses=document.getElementById('proses2').value;
    param='pekerjaan='+pekerjaan+'&kelas='+kelas+'&bobot='+bobot;
    param+='&proses='+proses;
//    alert(param);
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    loadtab2();
                    cleartab2();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }	
}

function loadtab2()
{
    param='proses=loadtab2';
//    alert(param);
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('contain2').innerHTML=con.responseText;
                    loadtab3();
                }	
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  		
}

function filltab2(pekerjaan,kelas,bobot)
{
    document.getElementById('pekerjaan').value=pekerjaan;
    document.getElementById('kelas').value=kelas;
    document.getElementById('bobot').value=bobot;
    document.getElementById('proses2').value='update2';
    document.getElementById('pekerjaan').disabled=true;
    document.getElementById('kelas').disabled=true;
}

function cleartab2()
{
    document.getElementById('pekerjaan').value='';
    document.getElementById('kelas').value='';
    document.getElementById('bobot').value='';
    document.getElementById('pekerjaan').disabled=false;
    document.getElementById('kelas').disabled=false;
    document.getElementById('proses2').value='insert2';
}

function deltab2(pekerjaan,kelas)
{
    param='proses=delete2'+'&pekerjaan='+pekerjaan+'&kelas='+kelas;
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    if(confirm("Anda Yakin Ingin Menhapus Data?"))
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    loadtab2();
                }	
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  
}

function savetab3()
{
    dari=document.getElementById('dari').value;
    sampai=document.getElementById('sampai').value;
    keterangan=document.getElementById('keterangan').value;
    dariold=document.getElementById('dariold').value;
    sampaiold=document.getElementById('sampaiold').value;
    proses=document.getElementById('proses3').value;
    param='dari='+dari+'&sampai='+sampai+'&keterangan='+keterangan+'&dariold='+dariold+'&sampaiold='+sampaiold;
    param+='&proses='+proses;
//    alert(param);
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                        alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    loadtab3();
                    cleartab3();
                }
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }	
}

function loadtab3()
{
    param='proses=loadtab3';
//    alert(param);
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    document.getElementById('contain3').innerHTML=con.responseText;
                    getPekerjaan();
                }	
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  		
}

function cleartab3()
{
    document.getElementById('dari').value='';
    document.getElementById('sampai').value='';
    document.getElementById('keterangan').value='';
    document.getElementById('dariold').value='';
    document.getElementById('sampaiold').value='';
    document.getElementById('proses3').value='insert3';
}

function filltab3(dari,sampai,keterangan)
{
    document.getElementById('dari').value=dari;
    document.getElementById('sampai').value=sampai;
    document.getElementById('keterangan').value=keterangan;
    document.getElementById('dariold').value=dari;
    document.getElementById('sampaiold').value=sampai;
    document.getElementById('proses3').value='update3';
}

function deltab3(dari,sampai)
{
    param='proses=delete3'+'&dari='+dari+'&sampai='+sampai;
    tujuan='kebun_slave_qc_5kriteriaKondTBM.php';
    if(confirm("Anda Yakin Ingin Menhapus Data?"))
    post_response_text(tujuan, param, respog);
    function respog()
    {
        if(con.readyState==4)
        {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                }
                else {
                    loadtab3();
                }	
            }
            else {
                busy_off();
                error_catch(con.status);
            }
        }	
    }  
}

