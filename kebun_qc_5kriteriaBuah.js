//// JavaScript Document
function save_ancak()
{
	KbnId=document.getElementById('KbnId').options[document.getElementById('KbnId').selectedIndex].value;
	nm_ancak=document.getElementById('nm_ancak').value;
	pro=document.getElementById('proses');
	param='KbnId='+KbnId+'&nm_ancak='+nm_ancak;
	param+='&proses='+pro.value;
        //alert(param);
	tujuan='kebun_slave_qc_5kriteriaBuah.php';
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
							load_data();
                                                        clear_form();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }  	

}
function load_data()
{
	//alert("test");
        pros=document.getElementById('proses').value;
	param='proses=load_data_header';
	tujuan='kebun_slave_qc_5kriteriaBuah.php';
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
                                                        getOptId();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }

}
function clear_form()
{
	document.getElementById('KbnId').value='';
	document.getElementById('nm_ancak').value='';
	document.getElementById('KbnId').disabled=false;
        document.getElementById('proses').value='insert_header';
}
function fillField(kode,nmkode)
{
	l=document.getElementById('KbnId');
        for(a=0;a<l.length;a++)
            {
                if(l.options[a].value==kode)
                    {
                        l.options[a].selected=true;
                    }
            }
	document.getElementById('nm_ancak').value=nmkode;
	document.getElementById('proses').value='update';
        document.getElementById('KbnId').disabled=true;
}
function delHead(kd)
{
    param='proses=delHead'+'&KbnId='+kd;
    //alert(param);
    tujuan='kebun_slave_qc_5kriteriaBuah.php';
    if(confirm("Anda Yakin Ingin Menhapus Data!!"))
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
                                    load_data();
                            }	
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
      }	
    }  
}
function getOptId()
{
    param='proses=getKdDt';
    tujuan='kebun_slave_qc_5kriteriaBuah.php';
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
                                         //	alert(con.responseText);
                                                document.getElementById('idAncak').innerHTML=con.responseText;
                                                load_data_nilai();
                                        }
                                }
                                else {
                                        busy_off();
                                        error_catch(con.status);
                                }
              }	
         }  
    
}
function save_data()
{
	idan=document.getElementById('idAncak').options[document.getElementById('idAncak').selectedIndex].value;
	nildr=document.getElementById('nilDari').value;
	nilsm=document.getElementById('nilSmp').value;
	nil=document.getElementById('nilai').value;
	pro=document.getElementById('proses_pekerjaan').value;
	param='idAncak='+idan+'&nilDari='+nildr+'&nilSmp='+nilsm+'&nilai='+nil;
	param+='&proses='+pro;
	//alert(param);
	tujuan='kebun_slave_qc_5kriteriaBuah.php';
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
							//document.getElementById('contain').value=con.responseText;
							load_data_nilai();
                                                        bersih_form();
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }	
	 }
	
}
function load_data_nilai()
{
		param+='&proses=load_data_nilai';
		//alert(param);
		tujuan='kebun_slave_qc_5kriteriaBuah.php';
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
						document.getElementById('containPekerja').innerHTML=con.responseText;
						//load_data_grade();
					}	
				}
				else {
					busy_off();
					error_catch(con.status);
				}
		  }	
		}  
		
}
function bersih_form()
{
	document.getElementById('idAncak').value='';
	document.getElementById('idAncak').disabled=false;
	document.getElementById('nilDari').value=0;
	document.getElementById('nilSmp').value=0;
	document.getElementById('nilai').value=0;
	document.getElementById('proses_pekerjaan').value='insert_pekerjaan';
}

function fillData(kd,dr,smp,nil)
{
    l=document.getElementById('idAncak');
        for(a=0;a<l.length;a++)
            {
                if(l.options[a].value==kd)
                    {
                        l.options[a].selected=true;
                    }
            }
    document.getElementById('idAncak').disabled=true;
    document.getElementById('nilDari').value=dr;
    document.getElementById('nilSmp').value=smp;
    document.getElementById('nilai').value=nil;
    document.getElementById('proses_pekerjaan').value='update_pekerjaan';
}
function delData(kd)
{
    param='proses=delDataNilai'+'&idAncak='+kd;
    //alert(param);
    tujuan='kebun_slave_qc_5kriteriaBuah.php';
    if(confirm("Anda Yakin Ingin Menhapus Data!!"))
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
                                    load_data_nilai();
                                    //load_data_operator();
                            }	
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
      }	
    }  
}


//
//

//



//
//function cariData(num)
//{
//		txtTgl=document.getElementById('tgl_cari').value;
//		txtCari=document.getElementById('txtCari').value;
//		param="txtTgl="+txtTgl+"&txtCari="+txtCari;
//		param+="&proses=cariTransaksi";
//		param+='&page='+num;
//		tujuan = 'vhc_slave_save_pekerjaan.php';
//	
//		post_response_text(tujuan, param, respog);			
//		function respog(){
//			if (con.readyState == 4) {
//				if (con.status == 200) {
//					busy_off();
//					if (!isSaveResponse(con.responseText)) {
//						alert('ERROR TRANSACTION,\n' + con.responseText);
//					}
//					else {
//						document.getElementById('contain').innerHTML=con.responseText;
//					}
//				}
//				else {
//					busy_off();
//					error_catch(con.status);
//				}
//			}
//		}	
//}
//function load_data_grade()
//{
//    param='proses=load_data_grade';
//    tujuan='kebun_qc_5kriteriaBuah.php';	
//    post_response_text(tujuan, param, respog);
//    function respog()
//    {
//      if(con.readyState==4)
//      {
//                    if (con.status == 200) {
//                            busy_off();
//                            if (!isSaveResponse(con.responseText)) {
//                                    alert('ERROR TRANSACTION,\n' + con.responseText);
//                            }
//                            else {
//                                    //alert(con.responseText);
//                                document.getElementById('containOperator').innerHTML=con.responseText;
//                            }
//                    }
//                    else {
//                            busy_off();
//                            error_catch(con.status);
//                    }
//      }	
//    }  	
//   
//
//}
//
//function save_grade()
//{
//    grNilDr=document.getElementById('grNilDr').value;
//    grNilSmp=document.getElementById('grNilSmp').value;
//    grKet=document.getElementById('grKet').value;
//    pro=document.getElementById('prosesOpt').value;
//    grDrOld=document.getElementById('grNilDrOld').value;
//    grSmpOld=document.getElementById('grNilSmpOld').value;
//    param='grNilDr='+grNilDr+'&grNilSmp='+grNilSmp+'&grKet='+grKet;
//    param+='&proses='+pro;
//    if(grDrOld!=''&&grSmpOld!='')
//    {
//        param+='&grSmpOld='+grSmpOld+'&grDrOld='+grDrOld;
//    }
//    //alert(param);
//    tujuan='kebun_slave_qc_5kriteriaAncak.php';
//    post_response_text(tujuan, param, respog);
//    function respog()
//    {
//                  if(con.readyState==4)
//                  {
//                            if (con.status == 200) {
//                                            busy_off();
//                                            if (!isSaveResponse(con.responseText)) {
//                                                    alert('ERROR TRANSACTION,\n' + con.responseText);
//                                            }
//                                            else {
//                                                    //alert(con.responseText);
//                                                    //document.getElementById('contain').value=con.responseText;
//                                                    load_data_grade();
//                                                    clear_grade();
//                                            }
//                                    }
//                                    else {
//                                            busy_off();
//                                            error_catch(con.status);
//                                    }
//                  }	
//     }
//    
//}
//function clear_grade()
//{
//	document.getElementById('grNilDr').value=0;
//	document.getElementById('grNilSmp').value=0;
//	document.getElementById('grKet').value=''
//	document.getElementById('prosesOpt').value='insert_grade';
//}
//function fillDataGrade(dr,smp,nil)
//{
//    document.getElementById('grNilDr').value=dr;
//    document.getElementById('grNilSmp').value=smp;
//    document.getElementById('grNilDrOld').value=dr;
//    document.getElementById('grNilSmpOld').value=smp;
//    document.getElementById('grKet').value=nil;
//    document.getElementById('prosesOpt').value='update_grade';
//}
//function delDataGrade(dr,smp)
//{
//   
//    param='grNilDr='+dr+'&grNilSmp='+smp;
//    param+='&proses=delGradePanen';
// 
//    tujuan='kebun_slave_qc_5kriteriaAncak.php';
//    if(confirm("Anda Yaking Ingin Menghapus Data Ini!!"))
//    post_response_text(tujuan, param, respog);
//    function respog()
//    {
//                  if(con.readyState==4)
//                  {
//                            if (con.status == 200) {
//                                            busy_off();
//                                            if (!isSaveResponse(con.responseText)) {
//                                                    alert('ERROR TRANSACTION,\n' + con.responseText);
//                                            }
//                                            else {
//                                                    //alert(con.responseText);
//                                                    //document.getElementById('contain').value=con.responseText;
//                                                    load_data_grade();
//                                                  
//                                            }
//                                    }
//                                    else {
//                                            busy_off();
//                                            error_catch(con.status);
//                                    }
//                  }	
//     }
//    
//}
//
//
//
//
