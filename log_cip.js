function get_isi(kdorg,nm_org)
{
        param='kdorg='+kdorg;
        tujuan='log_slave_get_no_cip.php';
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
                                                        document.getElementById('nocip').value=trim(con.responseText);
                                                        

                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }  	
}
function saveData(passParam)
{
  var passP =  passParam.split('##');
    var param = "";
    for(i=1;i<passP.length;i++) {
        var tmp = document.getElementById(passP[i]);
        if(i==1) {
            param += passP[i]+"="+getValue(passP[i]);
        } else {
            param += "&"+passP[i]+"="+getValue(passP[i]);
        }
    }	
	//alert(param);
	pros=document.getElementById('proses').value;
	param+='&proses='+pros;
	
	tujuan='log_slave_cip_detail.php';
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
							alert('Data Berhasil Disimpan.');
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
function bersih()
{
	
	/*document.getElementById('kd_bag').value='';
	document.getElementById('nocip').value='';
	document.getElementById('keterangan').value='';*/
	window.location.reload();
	
}
function loadData()
{
	param='proses=LoadData';
	tujuan='log_slave_cip_detail.php';
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

function cariData(){	
	caricip = document.getElementById('caricip').value;
	param='proses=cariData';
	param+='&caricip='+caricip;
	tujuan='log_slave_cip_detail.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		      if(con.readyState==4){
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

function cariBast(num)
{
		param='proses=LoadData';
		param+='&page='+num;
		tujuan = 'log_slave_cip_detail.php';
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
function fillField(nocip,ispost)
{
	if((ispost=='0')||(ispost==''))
	{
		nocip=nocip;
		param='nocip='+nocip+'&proses=showData';
		tujuan='log_slave_cip_detail.php';
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
								//loadData();
								ar=con.responseText.split("###");
								//alert(ar);
								document.getElementById('kd_bag').options[document.getElementById('kd_bag').selectedIndex].value=ar[5];
								document.getElementById('kd_bag').options[document.getElementById('kd_bag').selectedIndex].text=ar[4];
								document.getElementById('kodetipe').options[document.getElementById('kodetipe').selectedIndex].value=ar[8];
								document.getElementById('kodetipe').options[document.getElementById('kodetipe').selectedIndex].text=ar[7];
								document.getElementById('nocip').value=ar[1];
								document.getElementById('keterangan').value=ar[2];
								document.getElementById('tgl_cip').value=ar[3];
								document.getElementById('proses').value='update';
								document.getElementById('nocip').disabled=true;
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
					}	
		}
		post_response_text(tujuan, param, respog);
	}
	else if(ispost=='1')
	{
		alert('No.CIP ('+nocip+') sudah diposting dan diangkat menjadi aset');
        return;
	}
}
function deldata(nocip,ispost)
{
	if((ispost=='0')||(ispost==''))
	{
		nocip=nocip;
		param='nocip='+nocip+'&proses=delData';
		//alert(param);
		tujuan='log_slave_cip_detail.php';
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
								alert('Data Berhasil Dihapus.');
								window.location.reload();
								//loadData();
								//bersih();
							}
						}
						else {
							busy_off();
							error_catch(con.status);
						}
				  }	
		 }  
		 if(confirm("Are You Sure Want Delete This Data"))
			post_response_text(tujuan, param, respog);
	}
	else if(ispost=='1')
	{
		alert('No.CIP ('+nocip+') sudah diposting dan diangkat menjadi aset');
        return;
	}
}

function showdetailcip(kdorg,nocip,keterangan,tanggalbuat,noakun,ispost){
	if((ispost=='0')||(ispost=='')){
		document.getElementById('CIPHeader').style.display = 'block';
		document.getElementById('listData').style.display='none';
		document.getElementById('headher').style.display='none';
		var kdorg=kdorg;
		//alert(namaorganisasi.trim());
		var nocip=nocip;
		var keterangan=keterangan;
		var tanggalbuat=tanggalbuat;
		var noakun=noakun;
		param='kdorg='+kdorg+'&nocip='+nocip+'&keterangan='+keterangan+'&tanggalbuat='+tanggalbuat+'&noakun='+noakun+'&proses=showCIPdet';
		//alert(param);
		function respon(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					} 
					else {
						// Success Response
						var headerDiv = document.getElementById('CIPHeader');
						headerDiv.innerHTML = con.responseText;
						get_isi_aset(kdorg,noakun);

					}
				} 
				else
				{
					busy_off();
					error_catch(con.status);
				}
			}
		}
		post_response_text('log_slave_cip_detail.php', param, respon);
	}
	else if(ispost=='1')
	{
		alert('No.CIP ('+nocip+') sudah diposting dan diangkat menjadi aset');
        return;
	}	
	
}
function get_isi_aset(kdorg,noakun)
{
        param='kdorg='+kdorg+'&proses=LoadNoAsset'+'&noakun='+noakun;
        tujuan='log_slave_get_no_cip_4_aset.php';
        post_response_text(tujuan, param, respog);

        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        alert('ERROR\n' + con.responseText);
                                                }
                                                else {
                                                        //alert(con.responseText);
                                                        document.getElementById('noaset').value=trim(con.responseText);
                                                        

                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }  	
}
function tutup(no){
	//alert(no);
	if(document.getElementById('plh_cip_'+no).checked){
		document.getElementById('noakun_'+no).disabled = true;
		document.getElementById('noakun_'+no).options[document.getElementById('noakun_'+no).selectedIndex].value='';
		document.getElementById('noakun_'+no).options[document.getElementById('noakun_'+no).selectedIndex].text='';
		//document.getElementById('angkatbiaya_'+no).disabled = true;
		/*var inputElems = document.getElementsByTagName("input"),
        count = 0;

        for (var i=0; i<inputElems.length; i++) {       
           if (inputElems[i].type == "checkbox" && inputElems[i].checked == true){
              count++;
              //alert(count);
           }
		   

        }
		//alert(count);
		document.getElementById("asset").innerHTML = 'Angkat Aset'+' '+'('+count+')';*/
	}
	else{
		document.getElementById('noakun_'+no).disabled = false;
		document.getElementById('noakun_'+no).options[document.getElementById('noakun_'+no).selectedIndex].value='';
		document.getElementById('noakun_'+no).options[document.getElementById('noakun_'+no).selectedIndex].text='';
		//document.getElementById('angkatbiaya_'+no).disabled = false;
		
	}
	
}
function simpanCIPDtl(){
	var tbl = document.getElementById("CIPDetailTable");
    var row = tbl.rows.length;
    row=row-2;
    var strUrl2 = '';
    for(i=1;i<=row;i++){
		if(document.getElementById('plh_cip_'+i).checked){
			document.getElementById('plh_cip_'+i).value='1';			
		}
		else{
			document.getElementById('plh_cip_'+i).value='0';
			if(document.getElementById('noakun_'+i).options[document.getElementById('noakun_'+i).selectedIndex].value==''){
				alert('Akun biaya tidak boleh kosong');
				exit();
			}
		}
		 if(strUrl2 != ''){				
			strUrl2 +='&kdbrg[]='+document.getElementById('kdbrg_'+i).value
					+'&cekaset[]='+document.getElementById('plh_cip_'+i).value
					+'&noakun[]='+document.getElementById('noakun_'+i).options[document.getElementById('noakun_'+i).selectedIndex].value
					+'&nopp[]='+document.getElementById('nopp_'+i).value
					+'&nopo[]='+document.getElementById('nopo_'+i).value
					+'&nogrn[]='+document.getElementById('nogrn_'+i).value
					+'&jumlah[]='+document.getElementById('jumlah_'+i).value
					//+'&hrgsatuan[]='+parseFloat(document.getElementById('hrgsatuan_'+i).value.replace(',',''))
					+'&hrgsatuan[]='+document.getElementById('hrgsatuan_'+i).value
					//+'&subtotal[]='+parseFloat(document.getElementById('subtotal_'+i).value.replace(',',''));
					+'&subtotal[]='+document.getElementById('subtotal_'+i).value;
		 }
		 else{
			strUrl2 +='&kdbrg[]='+document.getElementById('kdbrg_'+i).value
					+'&cekaset[]='+document.getElementById('plh_cip_'+i).value
					+'&noakun[]='+document.getElementById('noakun_'+i).options[document.getElementById('noakun_'+i).selectedIndex].value
					+'&nopp[]='+document.getElementById('nopp_'+i).value
					+'&nopo[]='+document.getElementById('nopo_'+i).value
					+'&nogrn[]='+document.getElementById('nogrn_'+i).value
					+'&jumlah[]='+document.getElementById('jumlah_'+i).value
					//+'&hrgsatuan[]='+parseFloat(document.getElementById('hrgsatuan_'+i).value.replace(',',''))
					+'&hrgsatuan[]='+document.getElementById('hrgsatuan_'+i).value
					+'&subtotal[]='+document.getElementById('subtotal_'+i).value;
				  //+'&rsatuan_unit[]='+encodeURIComponent(trim(document.getElementById('sat_'+i).value));
			}		
	}
	var nocipx  = document.getElementById('nocipx').value;
	var noakuny = document.getElementById('noakuny').value;
	param='nocipx='+nocipx+'&noakun='+noakuny+'&strUrl2='+strUrl2; 
	tujuan='log_slave_save_cip_detail.php';
    function respog(){
        if(con.readyState==4){
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR\n' + con.responseText);
                }
                else {														   
					alert('Data berhasil disimpan.');
					//alert(con.responseText);
					window.location.reload();
                }
            }
            else {
				busy_off();
				error_catch(con.status);
            }
        }	
    } 
    if(confirm(document.getElementById('alertqinsert').value)){
        post_response_text(tujuan, param, respog);	
    }
}

function batalDtl(){
	window.location.reload();
}

function showdetail4jurnal(kdorg,nocip,keterangan,tanggalbuat,noakun){
	document.getElementById('Jurnalshow').style.display = 'block';
	document.getElementById('CIPHeader').style.display = 'none';
	document.getElementById('listData').style.display='none';
	document.getElementById('headher').style.display='none';
	var kdorg=kdorg;
	//alert(namaorganisasi.trim());
	var nocip=nocip;
	var keterangan=keterangan;
	var tanggalbuat=tanggalbuat;
	var noakun=noakun;
	param='kdorg='+kdorg+'&nocip='+nocip+'&keterangan='+keterangan+'&tanggalbuat='+tanggalbuat+'&noakun='+noakun+'&proses=showData4Jurnal';
	//alert(param);
	function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
					alert('ERROR\n' + con.responseText);
                } 
				else {
                    // Success Response
                    var headerDiv = document.getElementById('Jurnalshow');
                    headerDiv.innerHTML = con.responseText;
                    //get_isi_aset(kdorg);

                }
            } 
			else
			{
                busy_off();
                error_catch(con.status);
            }
        }
    }
    post_response_text('log_slave_cip_detail.php', param, respon);
}
function posting2Jurnal(nocip)
{
	/* var tbl = document.getElementById("CIPJurnalTable");
    var row = tbl.rows.length;
    row=row-2;
	//alert(row);
    var strUrl2 = '';
    for(i=1;i<=row;i++)            
	{
		 if(strUrl2 != '')
             {
				
                strUrl2 +='&kdbrg[]='+document.getElementById('kdbrg_'+i).value
						//+'&cekaset[]='+document.getElementById('plh_cip_'+i).value
                        //+'&noakun[]='+document.getElementById('noakun_'+i).options[document.getElementById('noakun_'+i).selectedIndex].value
                        +'&noakun[]='+document.getElementById('noakun_'+i).value
						+'&nopp[]='+document.getElementById('nopp_'+i).value
                        +'&nopo[]='+document.getElementById('nopo_'+i).value
					    +'&nogrn[]='+document.getElementById('nogrn_'+i).value
                        +'&jumlah[]='+document.getElementById('jumlah_'+i).value
					    //+'&hrgsatuan[]='+parseFloat(document.getElementById('hrgsatuan_'+i).value.replace(',',''))
						+'&hrgsatuan[]='+document.getElementById('hrgsatuan_'+i).value
					    //+'&subtotal[]='+parseFloat(document.getElementById('subtotal_'+i).value.replace(',',''));
						+'&subtotal[]='+document.getElementById('subtotal_'+i).value;
             }
		     else{
			    strUrl2 +='&kdbrg[]='+document.getElementById('kdbrg_'+i).value
						//+'&cekaset[]='+document.getElementById('plh_cip_'+i).value
                        //+'&noakun[]='+document.getElementById('noakun_'+i).options[document.getElementById('noakun_'+i).selectedIndex].value
                        +'&noakun[]='+document.getElementById('noakun_'+i).value
						+'&nopp[]='+document.getElementById('nopp_'+i).value
                        +'&nopo[]='+document.getElementById('nopo_'+i).value
					    +'&nogrn[]='+document.getElementById('nogrn_'+i).value
                        +'&jumlah[]='+document.getElementById('jumlah_'+i).value
					    //+'&hrgsatuan[]='+parseFloat(document.getElementById('hrgsatuan_'+i).value.replace(',',''))
						+'&hrgsatuan[]='+document.getElementById('hrgsatuan_'+i).value
					    +'&subtotal[]='+document.getElementById('subtotal_'+i).value;
                      //+'&rsatuan_unit[]='+encodeURIComponent(trim(document.getElementById('sat_'+i).value));
			}
	} */
	//param='strUrl2='+strUrl2+'&nocip='+nocip+'&proses=post2Jurnal'; 
	//noaset=document.getElementById('noaset').value;
	//param='nocip='+nocip+'&noaset='+noaset+'&proses=post2JurnalBiaya';
	param='nocip='+nocip+'&proses=post2JurnalBiaya';
	//alert(param);
	tujuan='log_slave_cip_detail.php';
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
                    /*alert(con.responseText);
                    return;*/
                    //document.getElementById('contain').innerHTML=con.responseText;
                    //document.getElementById('dataAtas').style.display='block';
                 
					alert('Data Berhasil Diposting Ke Jurnal.');
					window.location.reload();
                }
            }
            else {
                    busy_off();
                    error_catch(con.status);
            }
        }	
    } 
    if(confirm("Yakin Ingin Memposting ?"))
    {
        post_response_text(tujuan, param, respog);	
    }
}
