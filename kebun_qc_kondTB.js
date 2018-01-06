//// JavaScript Document
//
function add_new_data()
{
    bersihForm();
    document.getElementById('listSpb').style.display='none';
    document.getElementById('headher').style.display='block';
    document.getElementById('detailSpb').style.display='none';
    document.getElementById('notrans').value='';
}
function displayList()
{
    document.getElementById('listSpb').style.display='block';
    document.getElementById('headher').style.display='none';
    document.getElementById('detailSpb').style.display='none';
    document.getElementById('notrans').value='';
    document.getElementById('kodeOrgCari').value='';
    document.getElementById('tgl_cari').value='';
    loadData();
}
function bersihForm()
{
	document.getElementById('kodeOrg').value='';
        document.getElementById('kodeOrg').disabled=false;
        document.getElementById('save_kepala').disabled=false;
        document.getElementById('tgl_ganti').disabled=false;
	document.getElementById('tgl_ganti').value='';
        document.getElementById('idAsisten').value='';
        document.getElementById('idPetugas').value='';
	document.getElementById('detailContent').innerHTML='';
}

function getKaryNtPh(afdId,kdblok,notrans)
{
        pros=document.getElementById('proses').value;
        if(pros=='insert')
        {
            param='proses=getBlok'+'&afdelingId='+afdId;
        }
        else
        {
            param='proses=getBlok'+'&afdelingId='+afdId+'&kdBlok='+kdblok;
        }

       //alert(param);
        tujuan='kebun_slave_qc_kondTB.php';
        post_response_text(tujuan, param, respon);
        function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                       //alert(con.responseText);
                      // arData=con.responseText.split("###");
                       document.getElementById('kdBlok').innerHTML=con.responseText;
                       if(pros=='update')
                       {
                           getDataDetail(notrans,kdblok);
                       }
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }

}
function save_header()
{
        afdelingId=document.getElementById('kodeOrg').options[document.getElementById('kodeOrg').selectedIndex].value;
	tgl=document.getElementById('tgl_ganti').value;
        idAsisten=document.getElementById('idAsisten').options[document.getElementById('idAsisten').selectedIndex].value;
        idPetugas=document.getElementById('idPetugas').options[document.getElementById('idPetugas').selectedIndex].value;
       
       
        pros=document.getElementById('proses').value;
        param='proses='+pros+'&afdelingId='+afdelingId+'&tgl='+tgl;
        param+='&idAsisten='+idAsisten+'&idPetugas='+idPetugas;
        tujuan='kebun_slave_qc_kondTB.php';
        post_response_text(tujuan, param, respon);
        
        function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                       //alert(con.responseText);
                      if(pros!='update')
                      {
                          document.getElementById('detailSpb').style.display='block';
                          document.getElementById('notrans').value=con.responseText;
                          getKaryNtPh(afdelingId,0,0);
                      } 
                      document.getElementById('save_kepala').disabled=true;
                       
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
}

function loadData()
{
	param='proses=loadNewData';
	tujuan='kebun_slave_qc_kondTB.php';
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
							//return;
							document.getElementById('contain').innerHTML=con.responseText;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 } 	
	
}
function cariData()
{
    afdelingId=document.getElementById('kodeOrgCari').options[document.getElementById('kodeOrgCari').selectedIndex].value;
    tgl_cari=document.getElementById('tgl_cari').options[document.getElementById('tgl_cari').selectedIndex].value;
    param='afdelingId='+afdelingId+'&periode='+tgl_cari+'&proses=cariData';
    tujuan='kebun_slave_qc_kondTB.php';
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
                                                     document.getElementById('contain').innerHTML=con.responseText;
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }	
     } 	
}
function cariPage(num)
{
    afdelingId=document.getElementById('kodeOrgCari').options[document.getElementById('kodeOrgCari').selectedIndex].value;
    tgl_cari=document.getElementById('tgl_cari').options[document.getElementById('tgl_cari').selectedIndex].value;
    param='afdelingId='+afdelingId+'&periode='+tgl_cari+'&proses=cariData';
    param+='&page='+num;
    tujuan = 'kebun_slave_qc_kondTB.php';
    post_response_text(tujuan, param, respog);			
    function respog(){
            if (con.readyState == 4) {
                    if (con.status == 200) {
                            busy_off();
                            if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR TRANSACTION,\n' + con.responseText);
                            }
                            else {
                                    document.getElementById('contain').innerHTML=con.responseText;
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
		param='proses=loadNewData';
		param+='&page='+num;
		tujuan = 'kebun_slave_qc_kondTB.php';
		post_response_text(tujuan, param, respog);			
		function respog(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					}
					else {
						document.getElementById('contain').innerHTML=con.responseText;
					}
				}
				else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
}
function fillField(notransdata,afdid,tgldata,asistn,ptgs,kdblok) 
{

    document.getElementById('listSpb').style.display='none';
    document.getElementById('headher').style.display='block';
    document.getElementById('detailSpb').style.display='none';
    document.getElementById('notrans').value=notransdata;
    lkodeorg=document.getElementById('kodeOrg');
    for(a=0;a<lkodeorg.length;a++)
        {
            if(lkodeorg.options[a].value==afdid)
                {
                    lkodeorg.options[a].selected=true;
                }
        }

        document.getElementById('kodeOrg').disabled=true;
        document.getElementById('tgl_ganti').disabled=true;
        //document.getElementById('noTph').value=notp;
        document.getElementById('save_kepala').disabled=false;
	document.getElementById('tgl_ganti').value=tgldata;
        lidPemeriksa=document.getElementById('idAsisten');
        for(adata=0;adata<lidPemeriksa.length;adata++)
        {
            if(lidPemeriksa.options[adata].value==asistn)
                {
                    lidPemeriksa.options[adata].selected=true;
                }
        }
        
        lidAsisten=document.getElementById('idPetugas');
        for(bdata=0;bdata<lidAsisten.length;bdata++)
        {
            if(lidAsisten.options[bdata].value==ptgs)
                {
                    lidAsisten.options[bdata].selected=true;
                }
        }
        document.getElementById('proses').value='update';
        getKaryNtPh(afdid,kdblok,notransdata);
}

function addDetail()
{
        document.getElementById('save_kepala').disabled=true;
        kdBlok=document.getElementById('kdBlok').options[document.getElementById('kdBlok').selectedIndex].value;
        piringan=document.getElementById('piringan').value;
        gwngan=document.getElementById('gwngan').value;
        pmupukn=document.getElementById('pmupukn').value;
        hpt=document.getElementById('hpt').value;
        
        pros=document.getElementById('proses_detail').value;
        noTrans=document.getElementById('notrans').value;
        param='proses='+pros+'&kdBlok='+kdBlok+'&piringan='+piringan;
        param+='&gwngan='+gwngan+'&pmupukn='+pmupukn+'&hpt='+hpt;
        param+='&noTrans='+noTrans;
        
        tujuan='kebun_slave_qc_kondTB.php';
        post_response_text(tujuan, param, respon);
        function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                       //alert(con.responseText);
                       loadDetail(noTrans);
                       clearDetail();
                       
              
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
}
function loadDetail(notransdata)
{
        document.getElementById('detailSpb').style.display='block';
	param='proses=loadDetail'+'&noTrans='+notransdata;
       // alert(param);
	tujuan='kebun_slave_qc_kondTB.php';
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
							//return;
							document.getElementById('detailContent').innerHTML=con.responseText;
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 } 	
	
}

function clearDetail()
{
    document.getElementById('kdBlok').disabled=false;
    //document.getElementById('karyawnId').value='';
    //document.getElementById('noTph').value='';
    document.getElementById('piringan').value='';
    document.getElementById('gwngan').value='';
    document.getElementById('pmupukn').value='';
    document.getElementById('hpt').value='';
    document.getElementById('proses_detail').value='insert_detail';
}
function getDataDetail(notrans,kdblok)
{
    param='proses=getDetail'+'&noTrans='+notrans+'&kdBlok='+kdblok;
   // alert(param);
    tujuan='kebun_slave_qc_kondTB.php';
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
                                                    ardata=con.responseText.split("###");
                                                    datMan3=document.getElementById('kdBlok');
                                                    for(data6=0;data6<datMan3.length;data6++)
                                                    {
                                                        if(datMan3.options[data6].value==ardata[0])
                                                        {
                                                            datMan3.options[data6].selected=true;
                                                        }
                                                    }
                                                    
                                                  if(kdblok!='')
                                                    {
                                                        document.getElementById('kdBlok').disabled=true;
                                                        document.getElementById('proses_detail').value='update_detail';
                                                    }
                                                    else
                                                    {
                                                        document.getElementById('kdBlok').disabled=false;
                                                        document.getElementById('proses_detail').value='insert_detail'; 
                                                    }
                                                    
                                                    document.getElementById('piringan').value=ardata[1];
                                                    document.getElementById('gwngan').value=ardata[2];
                                                    document.getElementById('pmupukn').value=ardata[3];
                                                    document.getElementById('hpt').value=ardata[4];
                                                    loadDetail(notrans);
                                                    
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }	
     } 	
}
function getData(notrans,kdblok)
{
    
    param='proses=getDetail'+'&noTrans='+notrans+'&kdBlok='+kdblok;
    tujuan='kebun_slave_qc_kondTB.php';
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
                                                   ardata=con.responseText.split("###");
                                                    datMan3=document.getElementById('kdBlok');
                                                    for(data6=0;data6<datMan3.length;data6++)
                                                    {
                                                        if(datMan3.options[data6].value==ardata[0])
                                                        {
                                                            datMan3.options[data6].selected=true;
                                                        }
                                                    }
                                                    
                                                    if(kdblok!='')
                                                    {
                                                        document.getElementById('kdBlok').disabled=true;
                                                        document.getElementById('proses_detail').value='update_detail';
                                                    }
                                                    else
                                                    {
                                                        document.getElementById('kdBlok').disabled=false;
                                                        document.getElementById('proses_detail').value='insert_detail'; 
                                                    }
                                                    
                                                    
                                                    document.getElementById('piringan').value=ardata[1];
                                                    document.getElementById('gwngan').value=ardata[2];
                                                    document.getElementById('pmupukn').value=ardata[3];
                                                    document.getElementById('hpt').value=ardata[4];
                                                    
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }	
     } 	
}
function delDataDetail(notrans,kdblok)
{
    param='proses=delDetail'+'&noTrans='+notrans+'&kdBlok='+kdblok;
    tujuan='kebun_slave_qc_kondTB.php';
    if(confirm("Anda yaking ingin menghapus data ini!!"))
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
                                                     loadDetail(notrans);
                                                      clearDetail();
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }	
     } 	
}
function delDataDetailHead(notrans,kdblok)
{
    //param='proses=delDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
    param='proses=delDetail'+'&noTrans='+notrans+'&kdBlok='+kdblok;
    tujuan='kebun_slave_qc_kondTB.php';
    if(confirm("Anda yaking ingin menghapus data ini!!"))
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
function delDataAll(notrans,kdorg,tgl)
{
    //param='proses=delDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
    param='proses=delDetailAll'+'&noTrans='+notrans;
    tujuan='kebun_slave_qc_kondTB.php';
    if(confirm("Anda yaking ingin menghapus semua data kodeorg: "+kdorg+" dan tanggal: "+tgl+"!!"))
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