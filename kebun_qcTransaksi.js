// JavaScript Document
function getForm()
{
kbnId=document.getElementById('tipeDt').value;
kbn=document.getElementById('kbnId').options[document.getElementById('kbnId').selectedIndex].value;
if(kbn=='')
{
    alert("Kebun Tidak Boleh Kosong");
    return;
}
afd=document.getElementById('afdId').options[document.getElementById('afdId').selectedIndex].value;
param='tipeDt='+kbnId+'&method=GetForm'+'&kbnId='+kbn+'&afdId='+afd;
tujuan='kebun_slave_qcTransaksi.php';
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
                                                daer=con.responseText.split("####");
                                                document.getElementById('content').innerHTML=daer[0];
                                                document.getElementById('infoDt').innerHTML=daer[1];
                                                 loadNewData();

                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
              }	
 } 	
}
function getAfd(kbn,afd)
{
    if(kbn==0||afd==0)
    {
        kbn=document.getElementById('kbnId').options[document.getElementById('kbnId').selectedIndex].value;
        param='method=GetAfd'+'&kbnId='+kbn;
    }
    else
    {
        param='method=GetAfd'+'&kbnId='+kbn+'&afdId='+afd;
    }

tujuan='kebun_slave_qcTransaksi.php';
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
                                                document.getElementById('afdId').innerHTML=con.responseText;
                                                //getForm();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
              }
 } 	
}
function smpnData(jmlhBrs,awalRow)
{
    met=document.getElementById('method').value;
    tipe=document.getElementById('tipeDt').options[document.getElementById('tipeDt').selectedIndex].value;
    if(tipe=='')
    {
        alert("Tipe QC Tidak Boleh Kosong");
        return;
    }
    notran=document.getElementById('notransaksi').value;
    tgl=document.getElementById('tgl_trans').value;
    blok=document.getElementById('blokId').options[document.getElementById('blokId').selectedIndex].value;
    Asisten=document.getElementById('AsistenId').options[document.getElementById('AsistenId').selectedIndex].value;
    mandId1=document.getElementById('mandorId1').options[document.getElementById('mandorId1').selectedIndex].value;
    mandId2=document.getElementById('mandorId2').options[document.getElementById('mandorId2').selectedIndex].value;
    if((tipe!='PUPUK')&&(tipe!='TM')&&(tipe!='TBM')&&(tipe!='TANAM'))
    {
        mandId3=document.getElementById('mandorId3').options[document.getElementById('mandorId3').selectedIndex].value;
        mandId4=document.getElementById('mandorId4').options[document.getElementById('mandorId4').selectedIndex].value;
    }
    if(tipe=='BUAH')
    {
        jjgPrk=document.getElementById('jjgPeriksa').value;
    }
    if(tipe=='PUPUK')
    {
         ppkApl=document.getElementById('pupukAplikasi').options[document.getElementById('pupukAplikasi').selectedIndex].value;
         blnApl=document.getElementById('blnAplikasi').value;
         blnRekomen=document.getElementById('blnRekomendasi').value;
    }
    if((tipe=='TM')||(tipe=='TBM')||(tipe=='TANAM')||(tipe=='PUPUK')||(tipe=='ANCAK'))
    {
        pkkPeriks=document.getElementById('pkkPeriksa').value;
    }
    if(tipe=='TANAM')
    {
        bibitPeriks=document.getElementById('bibitPeriksa').value;
    }
    strUrl='';
    for(i=1;i<=jmlhBrs;i++)
        {
            try{
                    if(strUrl != '')
                    {
                            strUrl += '&nilVal[]='+trim(document.getElementById('isiData_'+i).value)
                                   +'&idData[]='+trim(document.getElementById('qcId_'+i).value);
                    }
                    else
                    {
                            strUrl += '&nilVal[]='+trim(document.getElementById('isiData_'+i).value)
                                   +'&idData[]='+trim(document.getElementById('qcId_'+i).value);
                    }
            }
            catch(e){}
        }
    param='method='+met+'&tipeDt='+tipe+'&notransaksi='+notran+'&tgl_trans='+tgl;
    param+='&blokId='+blok+'&AsistenId='+Asisten+'&mandorId1='+mandId1+'&mandorId2='+mandId2;
    if((tipe!='PUPUK')&&(tipe!='TM')&&(tipe!='TBM')&&(tipe!='TANAM'))
    {
        param+='&mandorId3='+mandId3+'&mandorId4='+mandId4;
    }
    if(tipe=='BUAH')
    {
        param+='&jjgPeriksa='+jjgPrk;
    }
    if(tipe=='PUPUK')
    {
        param+='&pupukAplikasi='+ppkApl+'&blnAplikasi='+blnApl+'&blnRekomendasi='+blnRekomen;
    }
    if((tipe=='TM')||(tipe=='TBM')||(tipe=='TANAM')||(tipe=='PUPUK')||(tipe=='ANCAK'))
    {
        param+='&pkkPeriksa='+pkkPeriks;
    }
    if(tipe=='TANAM')
    {
        param+='&bibitPeriksa='+bibitPeriks;
    }
    param+=strUrl;
    //alert(param);
    tujuan='kebun_slave_qcTransaksi.php';
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
                                                     batalData();
                                                   
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }
     } 
}

function loadNewData()
{
        
       param='method=loadData';
        tglcr=document.getElementById('tgl_cari').value;
        tipecr=document.getElementById('tipeCr').options[document.getElementById('tipeCr').selectedIndex].value;
        if(tglcr!='')
        {
            param+='&tglCar='+tglcr;
        }
        if(tipecr!='')
        {
            param+='&tipeDtCr='+tipecr;
        }
         
tujuan='kebun_slave_qcTransaksi.php';
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

                                                document.getElementById('containerlist').innerHTML=con.responseText;
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
		param='method=loadData';
		param+='&page='+num;
                tglcr=document.getElementById('tgl_cari').value;
                tipecr=document.getElementById('tipeCr').options[document.getElementById('tipeCr').selectedIndex].value;
                if(tglcr!='')
                {
                    param+='&tglCar='+tglcr;
                }
                if(tipecr!='')
                {
                    param+='&tipeDtCr='+tipecr;
                }
		tujuan = 'kebun_slave_qcTransaksi.php';
		post_response_text(tujuan, param, respog);
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('containerlist').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}
}
function fillField(notrans,tipe,kbn,afd)
{
    param='notransaksi='+notrans+'&tipeDt='+tipe+'&method=GetForm';
    tujuan = 'kebun_slave_qcTransaksi.php';
    post_response_text(tujuan, param, respog);
    function respog(){
            if (con.readyState == 4) {
                    if (con.status == 200) {
                            busy_off();
                            if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR TRANSACTION,\n' + con.responseText);
                            }
                            else {

                                    tabAction(document.getElementById('tabFRM0'),0,'FRM',1);
                                    daer=con.responseText.split("####");
                                    document.getElementById('content').innerHTML=daer[0];
                                    document.getElementById('infoDt').innerHTML=daer[1];
                                    document.getElementById('tipeDt').value=tipe;
                                    document.getElementById('kbnId').value=kbn;
                                    document.getElementById('method').value='updateData';
                                    document.getElementById('tipeDt').disabled=true;
                                    document.getElementById('afdId').disabled=true;
                                    document.getElementById('kbnId').disabled=true;
                                    getAfd(kbn,afd);
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }
}
function batalData()
{
   // document.getElementById('content').innerHTML='';
  document.getElementById('infoDt').innerHTML='';
   // document.getElementById('tipeDt').value='';
   // document.getElementById('kbnId').value='';
    document.getElementById('method').value='insert';
    document.getElementById('tipeDt').disabled=false;
    document.getElementById('afdId').disabled=false;
    document.getElementById('kbnId').disabled=false;
    //document.getElementById('afdId').innerHTML='';
   //document.getElementById('afdId').innerHTML="<option value=''>"+isidt+"</option>";   
  getForm();
}
function delData(notrans)
{
    param='notransaksi='+notrans+'&method=delData';
    tujuan = 'kebun_slave_qcTransaksi.php';
    if(confirm("Anda Yakin Ingin Menhapus Data Ini??"))
    {
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
                                    batalData();
                                    loadNewData();
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }
}
function postingData(notrans)
{
    param='notransaksi='+notrans+'&method=postData';
    tujuan = 'kebun_slave_qcTransaksi.php';
    if(confirm("Anda Yakin Ingin Posting Data Ini??"))
    {
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
                                    batalData();
                                    loadNewData();
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }
}
xz=0;
function photoForm(notransaksi,ev)
{
   xz++;    
   param='notransaksi='+notransaksi;
   tujuan='qc_uploadPhoto.php'+"?"+param;  
   width='700';
   height='400';
  
   content="<iframe name=uploadPhoto"+xz+" frameborder=0 width=100% height=100% src='"+tujuan+"'></iframe>"
   showDialog1('Upload Photo QC:'+notransaksi,content,width,height,ev); 
}

function simpanPhoto(){
    eval("uploadPhoto"+xz+".document.getElementById('photoqc').action='qc_slave_savePhoto.php'");	
    eval("uploadPhoto"+xz+".document.getElementById('photoqc').submit()");
}

function delPicture(notransaksi,filename)
{
    param='notransaksi='+notransaksi+'&filename='+filename+'&aksi=del';
        tujuan = 'qc_slave_savePhoto.php';
    if(confirm("Anda yakin menghapus file "+filename+" ?"))
    {
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
                                    eval("uploadPhoto"+xz+".location.reload();");
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }
}