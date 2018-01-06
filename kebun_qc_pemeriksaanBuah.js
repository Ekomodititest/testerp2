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
        document.getElementById('idMandor3').value='';
        document.getElementById('idMandor2').value='';
        document.getElementById('idMandor').value='';
        document.getElementById('idMandor1').value='';
        document.getElementById('idAsisten').value='';
        document.getElementById('idPemeriksa').value='';
	document.getElementById('detailContent').innerHTML='';
}
//document.getElementById('noTph').innerHTML="<option value=''>"+nmTmblPilih+"</option>";
function getKaryNtPh(kdorg,karyid,tphid,notrans)
{
        pros=document.getElementById('proses').value;
        if(pros=='insert')
        {
            param='proses=getNtph'+'&kdOrg='+kdorg;
        }
        else
        {
            param='proses=getNtph'+'&kdOrg='+kdorg+'&karyawnId='+karyid+'&noTph='+tphid;
        }

       //alert(param);
        tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
                       arData=con.responseText.split("###");
                       document.getElementById('noTph').innerHTML=arData[0];
                       document.getElementById('karyawnId').innerHTML=arData[1];
                       if(pros=='update')
                       {
                           getDataDetail(notrans,karyid,tphid);
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

        kdOrg=document.getElementById('kodeOrg').options[document.getElementById('kodeOrg').selectedIndex].value;
	tgl=document.getElementById('tgl_ganti').value;
        idAsisten=document.getElementById('idAsisten').options[document.getElementById('idAsisten').selectedIndex].value;
        idMandor=document.getElementById('idMandor').options[document.getElementById('idMandor').selectedIndex].value;
        idPemeriksa=document.getElementById('idPemeriksa').options[document.getElementById('idPemeriksa').selectedIndex].value;
        idMandor_1=document.getElementById('idMandor1').options[document.getElementById('idMandor1').selectedIndex].value;
        idMandor_2=document.getElementById('idMandor2').options[document.getElementById('idMandor2').selectedIndex].value;
        idMandor_3=document.getElementById('idMandor3').options[document.getElementById('idMandor3').selectedIndex].value;
       
        pros=document.getElementById('proses').value;
        param='proses='+pros+'&kdOrg='+kdOrg+'&tgl='+tgl;
        param+='&idAsisten='+idAsisten+'&idMandor='+idMandor+'&idMandor_1='+idMandor_1;
        param+='&idMandor_2='+idMandor_2+'&idMandor_3='+idMandor_3+'&idPemeriksa='+idPemeriksa;
        tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
                          getKaryNtPh(kdOrg,0,0,0);
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
	tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
    kdOrg=document.getElementById('kodeOrgCari').options[document.getElementById('kodeOrgCari').selectedIndex].value;
    tgl_cari=document.getElementById('tgl_cari').options[document.getElementById('tgl_cari').selectedIndex].value;
    param='kdOrg='+kdOrg+'&periode='+tgl_cari+'&proses=cariData';
    tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
    kdOrg=document.getElementById('kodeOrgCari').options[document.getElementById('kodeOrgCari').selectedIndex].value;
    tgl_cari=document.getElementById('tgl_cari').options[document.getElementById('tgl_cari').selectedIndex].value;
    param='kdOrg='+kdOrg+'&periode='+tgl_cari+'&proses=cariData';
    param+='&page='+num;
    tujuan = 'kebun_slave_qc_pemeriksaanBuah.php';
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
		tujuan = 'kebun_slave_qc_pemeriksaanBuah.php';
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
function fillField(notransdata,kdorg,tgldata,prksa,asistn,mndr1,mandpanen1,mandpanen2,mandpanen3,karyid,ntph) 
{

    document.getElementById('listSpb').style.display='none';
    document.getElementById('headher').style.display='block';
    document.getElementById('detailSpb').style.display='none';
    document.getElementById('notrans').value=notransdata;
    lkodeorg=document.getElementById('kodeOrg');
    for(a=0;a<lkodeorg.length;a++)
        {
            if(lkodeorg.options[a].value==kdorg)
                {
                    lkodeorg.options[a].selected=true;
                }
        }

        document.getElementById('kodeOrg').disabled=true;
        document.getElementById('tgl_ganti').disabled=true;
        //document.getElementById('noTph').value=notp;
        document.getElementById('save_kepala').disabled=false;
	document.getElementById('tgl_ganti').value=tgldata;
        lidPemeriksa=document.getElementById('idPemeriksa');
        for(adata=0;adata<lidPemeriksa.length;adata++)
        {
            if(lidPemeriksa.options[adata].value==prksa)
                {
                    lidPemeriksa.options[adata].selected=true;
                }
        }
        
        lidAsisten=document.getElementById('idAsisten');
        for(bdata=0;bdata<lidAsisten.length;bdata++)
        {
            if(lidAsisten.options[bdata].value==asistn)
                {
                    lidAsisten.options[bdata].selected=true;
                }
        }
        
        lidMandor=document.getElementById('idMandor');
        for(datad=0;datad<lidMandor.length;datad++)
        {
            if(lidMandor.options[datad].value==mndr1)
            {
                lidMandor.options[datad].selected=true;
            }
        }
        
       
      
        datMan1=document.getElementById('idMandor1');
        for(data3=0;data3<datMan1.length;data3++)
        {
            if(datMan1.options[data3].value==mandpanen1)
            {
                datMan1.options[data3].selected=true;
            }
        }
        datMan2=document.getElementById('idMandor2');
        for(data5=0;data5<datMan2.length;data5++)
        {
            if(datMan2.options[data5].value==mandpanen2)
            {
                datMan2.options[data5].selected=true;
            }
        }
        datMan3=document.getElementById('idMandor3');
        for(data6=0;data6<datMan3.length;data6++)
        {
            if(datMan3.options[data6].value==mandpanen3)
            {
                datMan3.options[data6].selected=true;
            }
        }
        document.getElementById('proses').value='update';
         getKaryNtPh(kdorg,karyid,ntph,notransdata);
     //   getTph(kdorg,notp,notransdata,urut);
}

function addDetail()
{
        document.getElementById('save_kepala').disabled=true;
        karyawnId=document.getElementById('karyawnId').options[document.getElementById('karyawnId').selectedIndex].value;
	noTph=document.getElementById('noTph').options[document.getElementById('noTph').selectedIndex].value;
        jjgPriksa=document.getElementById('jjgPriksa').value;
        
        mnth=document.getElementById('mnth').value;
        krgMtng=document.getElementById('krgMtng').value;
        mtng=document.getElementById('mtng').value;
        lwtMtng=document.getElementById('lwtMtng').value;
        tngkiPnjng=document.getElementById('tngkiPnjng').value;
               
        pros=document.getElementById('proses_detail').value;
        noTrans=document.getElementById('notrans').value;
        param='proses='+pros+'&karyawnId='+karyawnId+'&jjgPriksa='+jjgPriksa;
        param+='&mnth='+mnth+'&krgMtng='+krgMtng+'&noTph='+noTph;
        param+='&lwtMtng='+lwtMtng+'&tngkiPnjng='+tngkiPnjng;
        param+='&mtng='+mtng+'&noTrans='+noTrans;
        //alert(param);
        tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
	tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
    document.getElementById('karyawnId').disabled=false;
    //document.getElementById('karyawnId').value='';
    document.getElementById('noTph').disabled=false;
    //document.getElementById('noTph').value='';
    document.getElementById('jjgPriksa').value='';
    document.getElementById('mnth').value='';
    document.getElementById('krgMtng').value='';
    document.getElementById('mtng').value='';
    document.getElementById('lwtMtng').value='';
    document.getElementById('tngkiPnjng').value='';
    document.getElementById('proses_detail').value='insert_detail';
}
function getDataDetail(notrans,karyid,ntph)
{
    param='proses=getDetail'+'&noTrans='+notrans+'&karyawnId='+karyid+'&noTph='+ntph;
   // alert(param);
    tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
                                                    datMan3=document.getElementById('karyawnId');
                                                    for(data6=0;data6<datMan3.length;data6++)
                                                    {
                                                        if(datMan3.options[data6].value==ardata[0])
                                                        {
                                                            datMan3.options[data6].selected=true;
                                                        }
                                                    }
                                                    datMan5=document.getElementById('noTph');
                                                    for(data7=0;data7<datMan5.length;data7++)
                                                    {
                                                        if(datMan5.options[data7].value==ardata[1])
                                                        {
                                                            datMan5.options[data7].selected=true;
                                                        }
                                                    }
                                                     if(karyid!=''&&ntph!='')
                                                    {
                                                        document.getElementById('karyawnId').disabled=true;
                                                        document.getElementById('noTph').disabled=true;
                                                        document.getElementById('proses_detail').value='update_detail';
                                                    }
                                                    else
                                                     {
                                                        document.getElementById('karyawnId').disabled=false;
                                                        document.getElementById('noTph').disabled=false;
                                                        document.getElementById('proses_detail').value='insert_detail';
                                                     }
                                                    
                                                    document.getElementById('jjgPriksa').value=ardata[2];
                                                    document.getElementById('mnth').value=ardata[3];
                                                    document.getElementById('krgMtng').value=ardata[3];
                                                    document.getElementById('mtng').value=ardata[4];
                                                    document.getElementById('lwtMtng').value=ardata[5];
                                                    document.getElementById('tngkiPnjng').value=ardata[6];
                                                    
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
function getData(notrans,karyid,ntph)
{
    param='proses=getDetail'+'&noTrans='+notrans+'&karyawnId='+karyid+'&noTph='+ntph;
   // alert(param);
    tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
                                                    datMan3=document.getElementById('karyawnId');
                                                    for(data6=0;data6<datMan3.length;data6++)
                                                    {
                                                        if(datMan3.options[data6].value==ardata[0])
                                                        {
                                                            datMan3.options[data6].selected=true;
                                                        }
                                                    }
                                                    datMan5=document.getElementById('noTph');
                                                    for(data7=0;data7<datMan5.length;data7++)
                                                    {
                                                        if(datMan5.options[data7].value==ardata[1])
                                                        {
                                                            datMan5.options[data7].selected=true;
                                                        }
                                                    }
                                                    if(karyid!=''&&ntph!='')
                                                    {
                                                        document.getElementById('karyawnId').disabled=true;
                                                        document.getElementById('noTph').disabled=true;
                                                        document.getElementById('proses_detail').value='update_detail';
                                                    }
                                                    else
                                                     {
                                                        document.getElementById('karyawnId').disabled=false;
                                                        document.getElementById('noTph').disabled=false;
                                                        document.getElementById('proses_detail').value='insert_detail';
                                                     }
                                                   
                                                    
                                                    
                                                    document.getElementById('jjgPriksa').value=ardata[2];
                                                    document.getElementById('mnth').value=ardata[3];
                                                    document.getElementById('krgMtng').value=ardata[3];
                                                    document.getElementById('mtng').value=ardata[4];
                                                    document.getElementById('lwtMtng').value=ardata[5];
                                                    document.getElementById('tngkiPnjng').value=ardata[6];
                                                    
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }	
     } 	
}
function delDataDetail(notrans,karyid,ntph)
{
    //param='proses=delDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
    param='proses=delDetail'+'&noTrans='+notrans+'&karyawnId='+karyid+'&noTph='+ntph;
    tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
function delDataDetailHead(notrans,karyid,ntph)
{
    //param='proses=delDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
    param='proses=delDetail'+'&noTrans='+notrans+'&karyawnId='+karyid+'&noTph='+ntph;
    tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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
    tujuan='kebun_slave_qc_pemeriksaanBuah.php';
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