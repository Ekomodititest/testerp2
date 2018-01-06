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
        document.getElementById('noTph').disabled=false;
        document.getElementById('save_kepala').disabled=false;
	document.getElementById('tgl_ganti').value='';
	document.getElementById('ptgSensus').value='';
        document.getElementById('noTph').innerHTML="<option value=''>"+nmTmblPilih+"</option>";
        document.getElementById('idAsisten').value='';
        document.getElementById('brsTph').value='';
        document.getElementById('idMandor').value='';
        document.getElementById('idMandor_1').value='';
        document.getElementById('buahTph').value='';
        document.getElementById('idMandor_2').value='';
        document.getElementById('brndlanTph').value='';
        document.getElementById('idMandor_3').value='';
        document.getElementById('bhTinggal').value='';
        document.getElementById('brndlTinggal').value='';
	document.getElementById('detailContent').innerHTML='';
        document.getElementById('tgl_ganti').disabled=false;
}
function getTph(kdorg,ntph,notrans,urut)
{
    pros=document.getElementById('proses').value;
        if(kdorg=='0'&&ntph=='0'&&notrans=='0'&&urut=='0')
        {
            kdOrg=document.getElementById('kodeOrg').options[document.getElementById('kodeOrg').selectedIndex].value;
            param='proses=getNtph'+'&kdOrg='+kdOrg;
        }
        else
        {
            kdOrg=kdorg;
            noTph=ntph;
            param='proses=getNtph'+'&kdOrg='+kdOrg+'&noTph='+noTph;
        }
       //alert(param);
        tujuan='kebun_slave_qc_ancakPanen.php';
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
                       document.getElementById('noTph').innerHTML=con.responseText;
                       if(pros=='update')
                       {
                           getDataDetail(notrans,urut);
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
	ptgSensus=document.getElementById('ptgSensus').value;
        noTph=document.getElementById('noTph').options[document.getElementById('noTph').selectedIndex].value;
        idAsisten=document.getElementById('idAsisten').options[document.getElementById('idAsisten').selectedIndex].value;
        idMandor=document.getElementById('idMandor').options[document.getElementById('idMandor').selectedIndex].value;
        idMandor_1=document.getElementById('idMandor_1').options[document.getElementById('idMandor_1').selectedIndex].value;
        idMandor_2=document.getElementById('idMandor_2').options[document.getElementById('idMandor_2').selectedIndex].value;
        idMandor_3=document.getElementById('idMandor_3').options[document.getElementById('idMandor_3').selectedIndex].value;
        
        brsTph=document.getElementById('brsTph').value;
        buahTph=document.getElementById('buahTph').value;
        brndlanTph=document.getElementById('brndlanTph').value;
        bhTinggal=document.getElementById('bhTinggal').value;
        brndlTinggal=document.getElementById('brndlTinggal').value;
        pros=document.getElementById('proses').value;
        param='proses='+pros+'&kdOrg='+kdOrg+'&tgl='+tgl;
        param+='&ptgSensus='+ptgSensus+'&noTph='+noTph+'&noTph='+noTph;
        param+='&idAsisten='+idAsisten+'&idMandor='+idMandor+'&idMandor_1='+idMandor_1;
        param+='&idMandor_2='+idMandor_2+'&idMandor_3='+idMandor_3+'&brsTph='+brsTph;
        param+='&buahTph='+buahTph+'&brndlanTph='+brndlanTph+'&brndlTinggal='+brndlTinggal+'&bhTinggal='+bhTinggal;
        tujuan='kebun_slave_qc_ancakPanen.php';
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
	tujuan='kebun_slave_qc_ancakPanen.php';
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
function cariBast(num)
{
		param='proses=loadNewData';
		param+='&page='+num;
		tujuan = 'kebun_slave_qc_ancakPanen.php';
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
function cariData()
{
    kdOrg=document.getElementById('kodeOrgCari').options[document.getElementById('kodeOrgCari').selectedIndex].value;
    tgl_cari=document.getElementById('tgl_cari').options[document.getElementById('tgl_cari').selectedIndex].value;
    param='kdOrg='+kdOrg+'&periode='+tgl_cari+'&proses=cariData';
    tujuan='kebun_slave_qc_ancakPanen.php';
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
    tujuan = 'kebun_slave_qc_ancakPanen.php';
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
function fillField(notransdata,kdorg,tgldata,brs,notp,jjgtnggal,bdrtnggl,ptgs,mndr1,mandpanen1,mandpanen2,mandpanen3,totjjgt,totbrdt,asis,urut) 
{
//"fillField('".$rData['notransaksi']."','".$rData['kodeorg']."','".tanggalnormal($rData['tanggal'])."',
//'".$rData['baris']."','".$rData['notph']."','".$rData['jjgtinggal']."','".$rData['bdrtinggal']."','".$rData['petugas']."','".$rData['mandor1']."','".$rData['madorpanen1']."'
//,'".$rData['mandorpanen2']."','".$rData['mandorpanen3']."','".$rData['totjjgtph']."','".$rData['totbrdtph']."','".$rData['asisten']."');\">
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
        document.getElementById('noTph').disabled=true;
        document.getElementById('tgl_ganti').disabled=true;
        //document.getElementById('noTph').value=notp;
        document.getElementById('save_kepala').disabled=false;
	document.getElementById('tgl_ganti').value=tgldata;
        document.getElementById('brsTph').value=brs;
       
        document.getElementById('bhTinggal').value=jjgtnggal;
        document.getElementById('brndlTinggal').value=bdrtnggl;
        lpetugas=document.getElementById('ptgSensus');
        for(datad=0;datad<lpetugas.length;datad++)
        {
            if(lpetugas.options[datad].value==ptgs)
            {
                lpetugas.options[datad].selected=true;
            }
        }
        
       // document.getElementById('idAsisten').value=asis;
        
        datMan=document.getElementById('idMandor');
        for(data2=0;data2<datMan.length;data2++)
        {
            if(datMan.options[data2].value==mndr1)
            {
                datMan.options[data2].selected=true;
            }
        }
        datMan1=document.getElementById('idMandor_1');
        for(data3=0;data3<datMan1.length;data3++)
        {
            if(datMan1.options[data3].value==mandpanen1)
            {
                datMan1.options[data3].selected=true;
            }
        }
        datMan2=document.getElementById('idMandor_2');
        for(data5=0;data5<datMan2.length;data5++)
        {
            if(datMan2.options[data5].value==mandpanen2)
            {
                datMan2.options[data5].selected=true;
            }
        }
        datMan3=document.getElementById('idMandor_3');
        for(data6=0;data6<datMan3.length;data6++)
        {
            if(datMan3.options[data6].value==mandpanen3)
            {
                datMan3.options[data6].selected=true;
            }
        }
        datAsisten=document.getElementById('idAsisten');
        for(data7=0;data7<datAsisten.length;data7++)
        {
            if(datAsisten.options[data7].value==asis)
            {
                datAsisten.options[data7].selected=true;
            }
        }
        document.getElementById('brndlanTph').value=totbrdt;
        document.getElementById('buahTph').value=totjjgt;
        document.getElementById('proses').value='update';
        getTph(kdorg,notp,notransdata,urut);
}

function addDetail()
{
        document.getElementById('save_kepala').disabled=true;
        kdOrg=document.getElementById('kodeOrg').options[document.getElementById('kodeOrg').selectedIndex].value;
	tgl=document.getElementById('tgl_ganti').value;
        noTph=document.getElementById('noTph').options[document.getElementById('noTph').selectedIndex].value;
	urutPkk=document.getElementById('urutPkk').value;
	psrPikul=document.getElementById('psrPikul').value;
        strUrl2 = '';
        for(i=0;i<6;i++)
        {
          try{
                if(strUrl2 != '')
                {
                    strUrl2 +='&dtKiri['+i+']='+trim(document.getElementById('kiri_'+i).value)
			    +'&dtKanan['+i+']='+encodeURIComponent(trim(document.getElementById('kanan_'+i).value));
                }
                else
                {
                    strUrl2 +='&dtKiri['+i+']='+trim(document.getElementById('kiri_'+i).value)
			    +'&dtKanan['+i+']='+encodeURIComponent(trim(document.getElementById('kanan_'+i).value));
                }
            }
            catch(e){}
        }
        pros=document.getElementById('proses_detail').value;
        noTrans=document.getElementById('notrans').value;
        param='proses='+pros+'&kdOrg='+kdOrg+'&tgl='+tgl;
        param+='&urutPkk='+urutPkk+'&noTph='+noTph;
        param+='&psrPikul='+psrPikul+'&noTrans='+noTrans;
        param+='&strDtKn='+strUrl2;
        //alert(param);
        tujuan='kebun_slave_qc_ancakPanen.php';
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
	tujuan='kebun_slave_qc_ancakPanen.php';
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
    document.getElementById('urutPkk').disabled=false;
    document.getElementById('urutPkk').value='';
    document.getElementById('psrPikul').value='';
    for(iad=1;iad<6;iad++)
    {
        document.getElementById('kiri_'+iad).value='';
        document.getElementById('kanan_'+iad).value='';
    }
}
function getDataDetail(notrans,urutpk)
{
    param='proses=getDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
   // alert(param);
    tujuan='kebun_slave_qc_ancakPanen.php';
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
                                                    if(urutpk!='')
                                                    {
                                                        document.getElementById('urutPkk').disabled=true;
                                                        document.getElementById('proses_detail').value='update_detail';
                                                    }
                                                    else
                                                    {
                                                        document.getElementById('urutPkk').disabled=false;
                                                        document.getElementById('proses_detail').value='insert_detail';
                                                    }
                                                    
                                                    //document.getElementById('proses_detail').value='update_detail';
                                                    document.getElementById('urutPkk').value=ardata[0];
                                                    document.getElementById('psrPikul').value=ardata[1];
                                                    document.getElementById('kiri_1').value=ardata[2];
                                                    document.getElementById('kanan_1').value=ardata[3];
                                                    document.getElementById('kiri_2').value=ardata[3];
                                                    document.getElementById('kanan_2').value=ardata[4];
                                                    document.getElementById('kiri_3').value=ardata[5];
                                                    document.getElementById('kanan_3').value=ardata[6];
                                                    document.getElementById('kiri_4').value=ardata[7];
                                                    document.getElementById('kanan_4').value=ardata[8];
                                                    document.getElementById('kiri_5').value=ardata[9];
                                                    document.getElementById('kanan_5').value=ardata[10];
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
function getData(notrans,urutpk)
{
    param='proses=getDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
   // alert(param);
    tujuan='kebun_slave_qc_ancakPanen.php';
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
                                                    if(urutpk!='')
                                                    {
                                                        document.getElementById('urutPkk').disabled=true;
                                                        document.getElementById('proses_detail').value='update_detail';
                                                    }
                                                    else
                                                    {
                                                        document.getElementById('urutPkk').disabled=false;
                                                        document.getElementById('proses_detail').value='insert_detail';
                                                    }
                                                    
                                                    document.getElementById('urutPkk').value=ardata[0];
                                                    document.getElementById('psrPikul').value=ardata[1];
                                                    document.getElementById('kiri_1').value=ardata[2];
                                                    document.getElementById('kanan_1').value=ardata[3];
                                                    document.getElementById('kiri_2').value=ardata[3];
                                                    document.getElementById('kanan_2').value=ardata[4];
                                                    document.getElementById('kiri_3').value=ardata[5];
                                                    document.getElementById('kanan_3').value=ardata[6];
                                                    document.getElementById('kiri_4').value=ardata[7];
                                                    document.getElementById('kanan_4').value=ardata[8];
                                                    document.getElementById('kiri_5').value=ardata[9];
                                                    document.getElementById('kanan_5').value=ardata[10];
                                                    
                                            }
                                    }
                                    else {
                                            busy_off();
                                            error_catch(con.status);
                                    }
                  }	
     } 	
}
function delDataDetail(notrans,urutpk)
{
    param='proses=delDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
   
    tujuan='kebun_slave_qc_ancakPanen.php';
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
function delDataDetailHead(notrans,urutpk)
{
   
    param='proses=delDetail'+'&noTrans='+notrans+'&urutPkk='+urutpk;
    tujuan='kebun_slave_qc_ancakPanen.php';
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
    tujuan='kebun_slave_qc_ancakPanen.php';
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