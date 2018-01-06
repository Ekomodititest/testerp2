/* function detailPembelian(){
	if(document.getElementById('jenisitem').value!=''){ 
        kd_bag=trim(document.getElementById('kd_bag').value);
        if(kd_bag==''){
                alert('Data inconsistent');	
        }
        else{
			document.getElementById('detailTable').style.display = 'block';
			document.getElementById('tmbl_all').style.display = 'block';
			document.getElementById('nopp').disabled=true;
			document.getElementById('tgl_pp').disabled=true;
			document.getElementById('kd_bag').disabled=true;
			document.getElementById('dtl_pem').disabled=true;
			document.getElementById('jenisitem').disabled=true;
			pass2detail();
			document.getElementById('tmbl_all').innerHTML="<button class=mybutton onclick=reset_data()>"+baTal+"</button><button class=mybutton onclick=frm_aju()>"+Done+"</button>";
        }	
	} 
	else {
		alert('Jenis item belum dipilih');
	}
} */

function detailPembelian(){
	var rtgl_pp = trim(document.getElementById('tgl_pp').value);
	var rkd_bag = trim(document.getElementById('kd_bag').value);
	var id_user = trim(document.getElementById('user_id').value);
	var kd_jenisitem = document.getElementById('jenisitem').options[document.getElementById('jenisitem').selectedIndex].value;
	
	tujuan='log_slave_pp_detail.php';	
	
	param = "proses=header_add";
	param += "&rtgl_pp="+rtgl_pp;
	param += "&rkd_bag="+rkd_bag;
	param += "&user_id="+id_user;				
	param += "&kd_jenisitem="+kd_jenisitem;
	
	if(rkd_bag=='') {
		alert(document.getElementById('lbl_kd_bag').innerHTML + ' ' + document.getElementById('alertrequired').value);
	} 	
	else if(kd_jenisitem=='') {
		alert(document.getElementById('lbl_jenisitem').innerHTML + ' ' + document.getElementById('alertrequired').value);
	} 	
	else {
		   post_response_text(tujuan, param, respog);	
	}
	
	function respog(){
		if(con.readyState==4){
				if (con.status == 200){
					busy_off();
					if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
					}
					else {
						//alert(con.responseText);
						document.getElementById('detailTable').style.display = 'block';
						document.getElementById('tmbl_all').style.display = 'block';
						document.getElementById('nopp').disabled=true;
						document.getElementById('tgl_pp').disabled=true;
						document.getElementById('kd_bag').disabled=true;
						document.getElementById('dtl_pem').disabled=true;
						document.getElementById('jenisitem').disabled=true;
						document.getElementById('nopp').value=con.responseText;						
						pass2detail();
						document.getElementById('tmbl_all').innerHTML="<button class=mybutton onclick=reset_data()>"+baTal+"</button><button class=mybutton onclick=frm_aju()>"+Done+"</button>";						
					}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
		}	
	}	
}

/* Function pass2detail
 * Fungsi untuk menampilkan tabel detail dari tabel Main yang dimaksud
 * I : numRow dari tabel Main
 * P : Ajax untuk extract data dan persiapan tabel dalam bentuk HTML
 * O : Tampilan tabel detail
 */
function pass2detail() {	
    var kode = document.getElementById('nopp');
    param = "id="+kode.value;
    param += "&proses=createTable";

    function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR\n' + con.responseText);
                } else {
                    // Success Response
                    var detailDiv = document.getElementById('detailTable');
                    detailDiv.innerHTML = con.responseText;
					
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    post_response_text('log_slave_pp_detail.php', param, respon);
}

function get_isi(kdorg,nm_org)
{
	document.getElementById('dtl_pem').disabled=false;
        param='kdorg='+kdorg;
        tujuan='log_slave_get_no_pp.php';
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
                                                        //document.getElementById('nopp').value=trim(con.responseText);
                                                        //document.getElementById('dtl_pem').disabled=false;

                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }  	
}
//bagian cari data barang dan kode anggaran, dari log_5masterbarang, keu_anggaran
function searchBrg(title,content,ev)
{
        width='500';
        height='400';
        showDialog1(title,content,width,height,ev);
        //alert('asdasd');
}
function searchCIP(title,content,ev)
{
        width='500';
        height='400';
        showDialog1(title,content,width,height,ev);
        //alert('asdasd');
}
function searchCIP(title,content,ev)
{
        isi=document.getElementById('kd_bag').options[document.getElementById('kd_bag').selectedIndex].value;
        content=content+"<input type='hidden' id='kodeorg' value="+isi+">";
		width='500';
		height='400';
		showDialog1(title,content,width,height,ev);
        findNoCIP();
	//alert('asdasd');
}
function findNoCIP()
{
		txt=trim(document.getElementById('no_cip').value);
		nopp=document.getElementById('nopp').value;
		nomor=document.getElementById('nomor').value
        kodeorg=document.getElementById('kd_bag').value;
        param='txtfind='+txt+'&kodeorg='+kodeorg+'&nopp='+nopp+'&nomor='+nomor;
		//alert(param);
        tujuan='log_slave_pp_detail.php';
        post_response_text(tujuan+'?'+'prosesz=getCIP', param, respog);
	
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
function setCIP(nocip,kodeorg,nomor)
{
	//alert(nomor);
	//kolom nocip harus di tambahin no baris karena kolom nocip bisa terdiri dari beberapa baris(28/11/2015) lihat di fungsi "setBrg"
    document.getElementById('nocip_'+nomor).value=nocip;
    
    closeDialog();
}
function previewDetail(nopP,ev)
{
        showDetail(nopP,ev);
        rnopp=nopP;
        param='rnopp='+rnopp+'&method=getDetailPP';
        tujuan='log_slave_save_log_pp.php';
        post_response_text(tujuan, param, respog);
        function respog()
        {
                      if(con.readyState==4)
                      {
                                if (con.status == 200) {
                                                busy_off();
                                                if (!isSaveResponse(con.responseText)) {
                                                        document.getElementById('contDetail').innerHTML=con.responseText;
                                                }
                                                else {
                                                        //alert(con.responseText);
                                                        document.getElementById('contDetail').innerHTML=con.responseText;
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         }  

}
function showDetail(noPP,ev)
{
        title="Purchase Request detail";
        content="<fieldset><legend>"+noPP+"</legend><div id=contDetail style='overflow:auto; width:750px; height:350px;' ></div></fieldset><input type=hidden id=datPP name=datPP value="+noPP+" />";
        width='800';
        height='600';
        showDialog1(title,content,width,height,ev);	
}
function findBrg()
{
        txt=trim(document.getElementById('no_brg').value);
		jenisitem = document.getElementById('jenisitem').options[document.getElementById('jenisitem').selectedIndex].value;
		tipepencarian = document.getElementById('tipepencarian').options[document.getElementById('tipepencarian').selectedIndex].value;
		if(tipepencarian=='') {
			alert('Silahkan pilih Tipe Pencarian');
			return;
		}
        if(txt=='')
        {
                alert('Text is obligatory');
        }
        else if(txt.length<1)
        {
                alert('Too short words');
        }
        else
        {
                param='txtfind='+txt+'&method=cariBarangDlmDtBs&jenisitem='+jenisitem+'&tipepencarian='+tipepencarian;
                tujuan='log_slave_save_log_pp.php';
                post_response_text(tujuan, param, respog);
        }
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
function setBrg(no_brg,namabrg,satuan,nomor)
{
         nomor=document.getElementById('nomor').value;
		 document.getElementById('kd_brg_'+nomor).value=no_brg;
         document.getElementById('oldKdbrg_'+nomor).value=no_brg;
         document.getElementById('nm_brg_'+nomor).value=namabrg;
         document.getElementById('sat_'+nomor).value=satuan;
         closeDialog();
}

//search anggaran

function searchAngrn(title,content,ev)
{
        width='500';
        height='400';
        showDialog1(title,content,width,height,ev);
        //alert('asdasd');
}
function findAngrn()
{
        txt2=trim(document.getElementById('no_angrn').value);
        if(txt2=='')
        {
                alert('Text is obligatory');
        }
        else
        {
                param='txtfind2='+txt2;
                tujuan='log_slave_get_brg.php';
                post_response_text(tujuan, param, respog);
        }
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
function setAngrn(no_angrn)
{
         var nomor=document.getElementById('nomor').value;
        //alert(nomor);
         document.getElementById('kd_angrn_'+nomor).value=no_angrn;
         //document.getElementById('nm_angrn_'+nomor).value=no_angrn;
         closeDialog();
}

function clear_data(id)
 {
        document.getElementById("nopp").value='';
        document.getElementById("tgl_pp").value='';
        document.getElementById('detail_pp').style.display = 'none';
        document.getElementById('nopp').disabled=false;
        document.getElementById('tgl_pp').disabled=false;
        document.getElementById('kd_bag').disabled=false;
        document.getElementById('dtl_pem').disabled=false;
        stat_inputb=0;
        stat_input=0;
 }
 //Simpan data header 
function simpanPerpem()
  {

        rnopp = trim(document.getElementById('nopp').value);
        rtgl_pp = trim(document.getElementById('tgl_pp').value);
        rkd_bag = trim(document.getElementById('kd_bag').options[document.getElementById('kd_bag').sectionRowIndex].value);
        id_user = trim(document.getElementById('user_id').value);
        method=document.getElementById('method').value;
        param='rnopp='+rnopp+'&rtgl_pp='+rtgl_pp+'&rkd_bag='+rkd_bag+'&usr_id='+id_user; //+'&rkd_org='+rkd_org;
        param+='&method='+method;
        //param+=strUrl;
        tujuan='log_slave_save_log_pp.php';
        //alert(param);

        //alert(param);
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
                                                                //document.getElementById('contain').innerHTML=con.responseText;
                                                                //alert('Saved succeed !!');
                                                                //clear_all_data();
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
stat_input=0;
stat_inputc=0;
function edit_header()
  {
        //alert(strUrl);

        stats=document.getElementById('method');
        if(stat_input==1)
        {

        //	alert('edit');
                rnopp = trim(document.getElementById('nopp').value);
                rtgl_pp = trim(document.getElementById('tgl_pp').value);
                rkd_bag = trim(document.getElementById('kd_bag').value);
                id_user = trim(document.getElementById('user_id').value);
                //rkd_org = trim(document.getElementById('kode_org').value);
                method=document.getElementById('method').value;
                param='rnopp='+rnopp+'&rtgl_pp='+rtgl_pp+'&rkd_bag='+rkd_bag+'&usr_id='+id_user; //+'&rkd_org='+rkd_org;
                param+='&method='+method;
                //param+=strUrl;
                tujuan='log_slave_save_log_pp.php';

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
                                                                        //alert('Saved succeed !!');
                                                                        clear_all_data();
                                                        }
                                                }
                                                else {
                                                        busy_off();
                                                        error_catch(con.status);
                                                }
                                  }	
                 } 	
                 //post_response_text(tujuan, param, respog);
                        var answer =confirm('Are you sure, Edit Header?');
                        if (answer){
                        post_response_text(tujuan, param, respog);
                        }
                        else{
                        clear_all_data();
                        }
        }
        else if(stat_input==0)
        {
                //alert('insert');
                if(stat_inputc==0)
                {
                        cek_data();
                }
                else
                {
                        displayList();
                }
        }
}

function cek_data()
{
        nopp=document.getElementById('detail_kode').value;
        rtgl_pp = trim(document.getElementById('tgl_pp').value);
        rkd_bag = trim(document.getElementById('kd_bag').value);
		var kd_jenisitem = document.getElementById('jenisitem').options[document.getElementById('jenisitem').selectedIndex].value;
        id_user = trim(document.getElementById('user_id').value);
        
        var tbl = document.getElementById("ppDetailTable");
        var row = tbl.rows.length;
        strUrl = '';
        for(i=0;i<row;i++)
        {
                        try{
                                if(strUrl != '')
                                {
                                        strUrl += '&kdbrg[]='+encodeURIComponent(trim(document.getElementById('kd_brg_'+i).value))
										+'&ketrng[]='+encodeURIComponent(trim(document.getElementById('ket_'+i).value))
										+'&peruntukan_barang[]='+encodeURIComponent(trim(document.getElementById('peruntukan_barang_'+i).value))
										+'&lokasi_pemasangan[]='+encodeURIComponent(trim(document.getElementById('lokasi_pemasangan_'+i).value))
										+'&rjmlhDiminta[]='+encodeURIComponent(trim(document.getElementById('jmlhDiminta_'+i).value))
										+'&rtgl_sdt[]='+encodeURIComponent(trim(document.getElementById('tgl_sdt_'+i).value))										
										+'&prioritypr[]='+encodeURIComponent(trim(document.getElementById('prioritypr_'+i).options[document.getElementById('prioritypr_'+i).selectedIndex].value))
										+'&rnocip[]='+encodeURIComponent(trim(document.getElementById('nocip_'+i).value))										
										+'&url1[]='+encodeURIComponent(trim(document.getElementById('url1_'+i).value))
										+'&url2[]='+encodeURIComponent(trim(document.getElementById('url2_'+i).value))
										+'&url3[]='+encodeURIComponent(trim(document.getElementById('url3_'+i).value));
                                }
                                else
                                {
                                        strUrl += '&kdbrg[]='+encodeURIComponent(trim(document.getElementById('kd_brg_'+i).value))
                                        +'&ketrng[]='+encodeURIComponent(trim(document.getElementById('ket_'+i).value))
										+'&peruntukan_barang[]='+encodeURIComponent(trim(document.getElementById('peruntukan_barang_'+i).value))
										+'&lokasi_pemasangan[]='+encodeURIComponent(trim(document.getElementById('lokasi_pemasangan_'+i).value))
                                        //+'&rkd_angrn[]='+encodeURIComponent(trim(document.getElementById('kd_angrn_'+i).value))
                                        +'&rjmlhDiminta[]='+encodeURIComponent(trim(document.getElementById('jmlhDiminta_'+i).value))
                                        +'&rtgl_sdt[]='+encodeURIComponent(trim(document.getElementById('tgl_sdt_'+i).value))														  
										+'&prioritypr[]='+encodeURIComponent(trim(document.getElementById('prioritypr_'+i).options[document.getElementById('prioritypr_'+i).selectedIndex].value))
										+'&rnocip[]='+encodeURIComponent(trim(document.getElementById('nocip_'+i).value))										
										+'&url1[]='+encodeURIComponent(trim(document.getElementById('url1_'+i).value))
										+'&url2[]='+encodeURIComponent(trim(document.getElementById('url2_'+i).value))
										+'&url3[]='+encodeURIComponent(trim(document.getElementById('url3_'+i).value));										
                                }
                        }
                        catch(e){}
        }
        param='cknopp='+nopp+'&tgl_pp='+rtgl_pp+'&kd_org='+rkd_bag+'&user_id='+id_user+'&proses=cek_data_header&kd_jenisitem='+kd_jenisitem;
        param+=strUrl;		
        tujuan='log_slave_get_user_id_log_pp.php';
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
														met=document.getElementById('method').value='cek_data_header';
                                                        //alert(con.responseText);
                                                        //return;
                                                        var id=con.responseText;
                                                        id=id-1;
                                                        switchEditAdd(id,'detail');
                                                        addNewRow('detailBody',true);
                                                        stat_inputc=1;
                                                        //document.getElementById('contain').innerHTML=con.responseText;
                                                }
                                        }
                                        else {
                                                busy_off();
                                                error_catch(con.status);
                                        }
                      }	
         } 	
        /*alert(param);
        return;*/

}

function addDetail(id) {
	// kd_bag kode
	crt=document.getElementById('method');
	var kd_jenisitem = document.getElementById('jenisitem').options[document.getElementById('jenisitem').selectedIndex].value;
	var prioritypr = document.getElementById('prioritypr_'+id).options[document.getElementById('prioritypr_'+id).selectedIndex].value;
	var detKode = document.getElementById('detail_kode');
    var rkd_brg = document.getElementById('kd_brg_'+id);
    //var rkd_angrn = document.getElementById('kd_angrn_'+id);
    var rjmlhDiminta = document.getElementById('jmlhDiminta_'+id);
    var rtgl_sdt = document.getElementById('tgl_sdt_'+id);
    var rket = document.getElementById('ket_'+id);
	var rCIP = document.getElementById('nocip_'+id);
    var tgl_header=document.getElementById('tgl_pp').value;
    var kd_org=document.getElementById('kd_bag').value;
    var id_user = trim(document.getElementById('user_id').value);
    var nopp=document.getElementById('detail_kode').value;
    var rtgl_pp = trim(document.getElementById('tgl_pp').value);
    var rkd_bag = trim(document.getElementById('kd_bag').value);
	var peruntukan_barang = document.getElementById('peruntukan_barang_'+id);
	var lokasi_pemasangan = document.getElementById('lokasi_pemasangan_'+id);
	
	var url1 = document.getElementById('url1_'+id).value;
	var url2 = document.getElementById('url2_'+id).value;
	var url3 = document.getElementById('url3_'+id).value;
	
	if(id != 0) {
		var priorityfirst = document.getElementById('prioritypr_0').options[document.getElementById('prioritypr_0').selectedIndex].value;
	
		if(priorityfirst != prioritypr){
			alert('Priority PR harus sama');
			return;
		}
	}
	
   // alert(url1);    
		/* if(crt.value=='insert'){
                var a=confirm('Are you sure add this detail');
                if(a)
                {
                        cek_data();
                }
        }
        else{ */
                        param = "proses=detail_add";
                        param += "&kode="+detKode.value;
                        param += "&kd_brg="+rkd_brg.value;
                        //param += "&kd_angrn="+rkd_angrn.value;
                        param += "&jmlhDiminta="+rjmlhDiminta.value;
                        param += "&tgl_sdt="+rtgl_sdt.value;
                        param += "&ket="+rket.value;
                        param += "&peruntukan_barang="+peruntukan_barang.value;
                        param += "&lokasi_pemasangan="+lokasi_pemasangan.value;
                        param += "&rkd_bag="+rkd_bag;
                        param += "&rtgl_pp="+rtgl_pp;
                        param += "&user_id="+id_user;						
						param += "&nocip="+rCIP.value;
						param += "&kd_jenisitem="+kd_jenisitem;						
						param += "&url1="+url1;
						param += "&url2="+url2;
						param += "&url3="+url3;
						param += "&prioritypr="+prioritypr;
					
                        tujuan='log_slave_pp_detail.php';

                function respon(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);												
												/* document.getElementById('kd_brg_'+id).value = '';
												document.getElementById('nm_brg_'+id).value = '';
												document.getElementById('sat_'+id).value = '';
												document.getElementById('nocip_'+id).value = '';	
												document.getElementById('jmlhDiminta_'+id).value = '';	
												document.getElementById('tgl_sdt_'+id).value = '';	
												document.getElementById('ket_'+id).value = '';	
												rket.value = '';
												*/
                                        } else {
                                                // Success Response
                                           //alert(con.responseText);
                                           switchEditAdd(id,'detail');
                                           addNewRow('detailBody',true);
                                        }
                                } else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
                post_response_text(tujuan, param, respon);
        //}

}

function frm_aju() {
	var tbl = document.getElementById("ppDetailTable");
	var row = tbl.rows.length;
	row=row-3;
	min=-1;
	var newrow = 0;
	if(row==min){
		alert('Please input the details');
		return;
	}else{
		if(confirm('Process submission ??')){
			var rows = document.getElementById('detailBody').getElementsByTagName("tr").length;
			//alert(rows);return;
			newrow = parseInt(rows - 1);
			for(var c = 0; c <= newrow; c++) {
				//alert(document.getElementById('kd_brg_'+c).value);
				if(document.getElementById('kd_brg_'+c).value != ''){
					if(c > 0) {
						var priorityfirst = document.getElementById('prioritypr_0').options[document.getElementById('prioritypr_0').selectedIndex].value;
						var prioritypr = document.getElementById('prioritypr_'+c).options[document.getElementById('prioritypr_'+c).selectedIndex].value;
				
						if(priorityfirst != prioritypr){
							alert('Priority Pr harus sama');
							break;
							return;
						}
						else {editDetail2(c);}
					} else {
						editDetail2(c);
					}
					a = c + 1;
					alert('Data Ke-'+a+' Berhasil di update.');
				}
			}
			//alert(newrow);return;
			return;
			document.getElementById('list_pp').style.display='none';
			document.getElementById('form_pp').style.display='none';
			document.getElementById('persetujuan').style.display='block';
			nopp=document.getElementById('detail_kode').value;
			param='rnopp='+nopp+'&method=formPersetujuan';
			tujuan='log_slave_save_log_pp.php';
			function respog(){
				if(con.readyState==4){
					if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
						} else {
							document.getElementById('persetujuandata').innerHTML=con.responseText;
						}
					} else {
						busy_off();
						error_catch(con.status);
					}
				}	
			}
			post_response_text(tujuan, param, respog);
		} else {
			clear_all_data();
			displayList();
		}
	}
}

function editDetail2(id) {
    var detKode = document.getElementById('detail_kode');
    var rkd_brg = document.getElementById('kd_brg_'+id);
    var rjmlhDiminta = document.getElementById('jmlhDiminta_'+id);
    var rtgl_sdt = document.getElementById('tgl_sdt_'+id);
    var rket = document.getElementById('ket_'+id);
	var prioritypr = document.getElementById('prioritypr_'+id).options[document.getElementById('prioritypr_'+id).selectedIndex].value;
	var linkgambar = document.getElementById('url1_'+id);
	var linkgambar2 = document.getElementById('url2_'+id);
	var linkgambar3 = document.getElementById('url3_'+id);
	var peruntukan_barang = document.getElementById('peruntukan_barang_'+id);
	var lokasi_pemasangan = document.getElementById('lokasi_pemasangan_'+id);
	var nocip = document.getElementById('nocip_'+id);

	if(rkd_brg.value != '') {
		param = "proses=detail_edit";
		param += "&nopp="+detKode.value;
		param += "&nopp="+detKode.value;
		param += "&kd_brg="+rkd_brg.value;	
		param += "&jmlhDiminta="+rjmlhDiminta.value;
		param += "&tgl_sdt="+rtgl_sdt.value;
		param += "&ket="+rket.value;
		param += "&peruntukan_barang="+peruntukan_barang.value;
		param += "&lokasi_pemasangan="+lokasi_pemasangan.value;
		param += "&linkgambar="+linkgambar.value;
		param += "&linkgambar2="+linkgambar2.value;
		param += "&linkgambar3="+linkgambar3.value;
		param += "&prioritypr="+prioritypr;
		param += "&nocip="+nocip.value;
			if(document.getElementById('oldKdbrg_'+id).value!='')
			{ 
			var roldKdbrg =document.getElementById('oldKdbrg_'+id) ;
			param += "&oldKdbrg="+roldKdbrg.value;
			}
		//alert(param);return;
		post_response_text('log_slave_pp_detail.php', param, respon);
		function respon(){
			if (con.readyState == 4) {
				if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR TRANSACTION,\n' + con.responseText);
					} else {
						// Success Response
						//alert('Edit succeed');
						document.getElementById('list_pp').style.display='none';
						document.getElementById('form_pp').style.display='none';
						document.getElementById('persetujuan').style.display='block';
						nopp=document.getElementById('detail_kode').value;
						param='rnopp='+nopp+'&method=formPersetujuan';
						tujuan='log_slave_save_log_pp.php';
						function respog(){
							if(con.readyState==4){
								if (con.status == 200) {
									busy_off();
									if (!isSaveResponse(con.responseText)) {
										alert('ERROR\n' + con.responseText);
									} else {
										document.getElementById('persetujuandata').innerHTML=con.responseText;
									}
								} else {
									busy_off();
									error_catch(con.status);
								}
							}	
						}
						post_response_text(tujuan, param, respog);
					}
				} else {
					busy_off();
					error_catch(con.status);
				}
			}
		}	
	} 
}
/* Function editDetail(id,primField,primVal)
 * Fungsi untuk mengubah data Detail
 * I : id row (urutan row pada table Detail)
 * P : Mengubah data pada tabel Detail
 * O : Notifikasi data telah berubah
 */
function editDetail(id) {
//	alert('test');
    var detKode = document.getElementById('detail_kode');
    var rkd_brg = document.getElementById('kd_brg_'+id);
    var rjmlhDiminta = document.getElementById('jmlhDiminta_'+id);
    var rtgl_sdt = document.getElementById('tgl_sdt_'+id);
    var rket = document.getElementById('ket_'+id);
	var prioritypr = document.getElementById('prioritypr_'+id).options[document.getElementById('prioritypr_'+id).selectedIndex].value;
	var linkgambar = document.getElementById('url1_'+id);
	var linkgambar2 = document.getElementById('url2_'+id);
	var linkgambar3 = document.getElementById('url3_'+id);
	var peruntukan_barang = document.getElementById('peruntukan_barang_'+id);
	var lokasi_pemasangan = document.getElementById('lokasi_pemasangan_'+id);
	var nocip = document.getElementById('nocip_'+id);
	
    param = "proses=detail_edit";
    param += "&nopp="+detKode.value;
    param += "&kd_brg="+rkd_brg.value;	
    param += "&jmlhDiminta="+rjmlhDiminta.value;
    param += "&tgl_sdt="+rtgl_sdt.value;
    param += "&ket="+rket.value;
	param += "&peruntukan_barang="+peruntukan_barang.value;
	param += "&lokasi_pemasangan="+lokasi_pemasangan.value;
	param += "&nocip="+nocip.value;
    param += "&linkgambar="+linkgambar.value;
    param += "&linkgambar2="+linkgambar2.value;
    param += "&linkgambar3="+linkgambar3.value;
    param += "&prioritypr="+prioritypr;
        if(document.getElementById('oldKdbrg_'+id).value!='')
        { 
        var roldKdbrg =document.getElementById('oldKdbrg_'+id) ;
        param += "&oldKdbrg="+roldKdbrg.value;
        }
    //alert(param);return;
	post_response_text('log_slave_pp_detail.php', param, respon);
    function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    alert('Edit succeed');
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }

    
}

/* Function deleteDelete(id)
 * Fungsi untuk menghapus data Detail
 * I : id row (urutan row pada table Detail)
 * P : Menghapus data pada tabel Detail
 * O : Menghapus baris pada tabel Detail
 */
function deleteDetail(id) {
    var detKode = document.getElementById('detail_kode');
        var rkd_brg = document.getElementById('kd_brg_'+id);
    //var rkd_angrn = document.getElementById('kd_angrn_'+id);
    var rjmlhDiminta = document.getElementById('jmlhDiminta_'+id);
    var rtgl_sdt = document.getElementById('tgl_sdt_'+id);
    var rket = document.getElementById('ket_'+id);
	var rnocip = document.getElementById('nocip_'+id);

                param = "proses=detail_delete";
                param += "&nopp="+detKode.value;
                param += "&kd_brg="+rkd_brg.value;
                //param += "&kd_angrn="+rkd_angrn.value;
                param += "&jmlhDiminta="+rjmlhDiminta.value;
                param += "&tgl_sdt="+rtgl_sdt.value;
                param += "&ket="+rket.value;
				param += "&nocip="+rnocip.value;
                function respon(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR TRANSACTION,\n' + con.responseText);
                                        } else {
                                                // Success Response
                                row = document.getElementById("detail_tr_"+id);
                                if(row) {
                                row.style.display="none";
                                } else {
                                alert("Row undetected");
                                }
                                        }
                                } else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
                 a=confirm('Are You Sure Delete This Data !');
                        if(a)
                        {
                                //alert(param);
                        //	return;
                                post_response_text('log_slave_pp_detail.php', param, respon);

                        }
                        else
                        {
                                return;
                        }
}
 /* Function addNewRow
 * Fungsi untuk menambah row baru ke dalam table
 * I : id dari tbody tabel
 * P : Persiapan row dalam bentuk HTML
 * O : Tambahan row pada akhir tabel (append)
 */
function addNewRow(body,onDetail) {
        //alert(body);
    var tabBody = document.getElementById(body);
    if(onDetail) {
        var detail = onDetail;

    } else {
        var detail = false;
    }

    // Search Available numRow
    var numRow = 0;
    if(!detail) {
        while(document.getElementById('tr_'+numRow)) {
            numRow++;
        }
    } else {
        while(document.getElementById('detail_tr_'+numRow)) {
            numRow++;
        }
    }

    // Add New Row
    var newRow = document.createElement("tr");
    tabBody.appendChild(newRow);
    if(!detail) {
        newRow.setAttribute("id","tr_"+numRow);
    } else {
        newRow.setAttribute("id","detail_tr_"+numRow);
    }
    newRow.setAttribute("class","rowcontent");
	
	var x = document.getElementById("prioritypr_0");
	var optionst = "";
    var i;
    for (i = 1; i < x.length; i++) {
		optionst+="<option value="+x.options[i].value+">"+x.options[i].text+"</option>";
    }
	
    if(!detail) {
        newRow.innerHTML += "<td><input id='kode_"+numRow+
        "' type='text' class='myinputtext' style='width:70px' onkeypress='return tanpa_kutip(event)' value='' /></td><td><input id='matauang_"+numRow+
        "' type='text' class='myinputtext' style='width:70px' onkeypress='return tanpa_kutip(event)' value='' /></td><td><input id='simbol_"+numRow+
        "' type='text' class='myinputtext' style='width:70px' onkeypress='return tanpa_kutip(event)' value='' /></td><td><input id='kodeiso_"+numRow+
        "' type='text' class='myinputtext' style='width:70px' onkeypress='return tanpa_kutip(event)' value='' /></td><td><img id='add_"+numRow+
        "' title='Tambah' class=zImgBtn onclick=\"addMain('"+numRow+"')\" src='images/plus.png'/>"+        
        "&nbsp;<img id='pass_"+numRow+"' />"+
		"&nbsp;<img id='delete_"+numRow+"' />"+	
        "</td>";
    } else
        {
                // Create Row
		newRow.innerHTML += 
		"<td><input id='kd_brg_"+numRow+"' type='text' class='myinputtext' style='width:80px' disabled='disabled' value='' /><input type=hidden id=oldKdbrg_"+numRow+" name=oldKdbrg_"+numRow+"></td>"+
        "<td><input id='nm_brg_"+numRow+"' type='text' class='myinputtext' style='width:90px' disabled='disabled' value='' /><img src=images/search.png class=dellicon title='"+jdl_ats_0+"'"+
		"onclick=\"searchBrg('"+jdl_ats_1+"','<fieldset><legend>Mencari Data Barang Dari Database</legend>Tipe Pencarian : <select id=tipepencarian><option value></option><option value=kelompokbarang>Kode Kelompok Barang</option><option value=kodebarang>Kode Barang</option><option value=namabarang>Nama Barang</option></select>Kata Kunci<input type=text class=myinputtext id=no_brg><button class=mybutton onclick=findBrg()>Cari</button></fieldset><input id=nomor type=hidden value="+numRow+" /><div id=container></div>',event)\";></td>"+	
		
		"<td><input id='sat_"+numRow+"' type='text' class='myinputtext' style='width:50px'disabled='disabled' value='' /></td>"+		
		"<td><input id='nocip_"+numRow+"' type='text' class='myinputtext' style='width:90px' disabled='disabled' value='' /><img src=images/search.png class=dellicon title='"+jdl_bwh_0+"' onclick=\"searchCIP('Cari No. CIP','"+content_2+"<input id=nomor type=hidden value="+numRow+" />',event)\";></td>"+
		"<td><input id='jmlhDiminta_"+numRow+"' type='text' class='myinputtextnumber' style='width:40px' value='' onkeypress='return angka_doang(event)' /></td>"+
		"<td><select id='prioritypr_"+numRow+"' style='width:70px;'><option value=''></option>"+optionst+"</select></td>"+
		"<td><input type='text' style='width:70px' id='tgl_sdt_"+numRow+"' class='myinputtext' name='tgl_sdt_"+numRow+"' maxlength=\"10\" onmousemove=\"setCalendar(this.id)\" onkeypress=\"return false;\" ></td>"+
		"<td><input id='peruntukan_barang_"+numRow+"' type='text' class='myinputtext' style='width:80px' onkeypress='return tanpa_kutip(event)' value='' /></td>"+
		"<td><input id='lokasi_pemasangan_"+numRow+"' type='text' class='myinputtext' style='width:80px' onkeypress='return tanpa_kutip(event)' value='' /></td>"+		
		"<td><input id='ket_"+numRow+"' type='text' class='myinputtext' style='width:80px' onkeypress='return tanpa_kutip(event)' value='' /></td>"+
		"<td><img id='detail_add_"+numRow+"' title='Tambah' class=zImgBtn onclick=\"addDetail('"+numRow+"')\" src='images/save.png'/>"+
		"&nbsp;<img src=images/tool.png class=zImgBtn title='Link' onclick=\"inserLink('Link','<fieldset><legend>Link</legend><table><tr><td>Link 1</td><td><textarea id=link1_"+numRow+"></textarea></td></tr><tr><td>Link 2</td><td><textarea id=link2_"+numRow+"></textarea></td></tr><tr><td>Link 3</td><td><textarea id=link3_"+numRow+"></textarea></td></tr><tr><td></td><td><button onclick=saveLink("+numRow+")>Simpan</button></td></tr></table></fieldset><div id=container></div>',"+numRow+")\">"+
		"<input id='url1_"+numRow+"' name='url1_"+numRow+"' value='1' class=myinputtext type=hidden>"+
		"<input id='url2_"+numRow+"' name='url2_"+numRow+"' value='1' class=myinputtext type=hidden>"+
		"<input id='url3_"+numRow+"' name='url3_"+numRow+"' value='1' class=myinputtext type=hidden>"+
		"&nbsp;<img id='detail_delete_"+numRow+"' />"+
        "&nbsp;<img id='detail_pass_"+numRow+"' />"+
        "</td>";
        }
}
/* Function switchEditAdd
 * Fungsi untuk mengganti image add menjadi edit dan keroconya
 * I : id nomor row
 * P : Image Add menjadi Edit
 * O : Image Edit
 */
function switchEditAdd(id,main) {

 if(main=='main') {
        var idField = document.getElementById('add_'+id);
        var delImg = document.getElementById('delete_'+id);
        var passImg = document.getElementById('pass_'+id);
        var kode = document.getElementById('kode_'+id);
    } else {
        //alert(id);
        var idField = document.getElementById('detail_add_'+id);
        var delImg = document.getElementById('detail_delete_'+id);
    }
    if(idField) {
        idField.removeAttribute('id');
        idField.removeAttribute('name');
        idField.removeAttribute('onclick');
        idField.removeAttribute('src');
        idField.removeAttribute('title');

        // Set Edit Image Attr
        idField.setAttribute('title','Edit');
        if(main=='main') {
            idField.setAttribute('id','edit_'+id);
            idField.setAttribute('name','edit_'+id);
            idField.setAttribute('onclick','editMain(\''+id+'\',\'kode\',\''+kode.value+'\')');
        } else {
           idField.setAttribute('id','detail_edit_'+id);
           idField.setAttribute('name','detail_edit_'+id);
           idField.setAttribute('onclick','editDetail(\''+id+'\')');
        }
        idField.setAttribute('src','images/save.png');

        // Set Delete Image Attr
        delImg.setAttribute('class','zImgBtn');
        delImg.setAttribute('title','Hapus');
        if(main=='main') {
            delImg.setAttribute('name','delete_'+id);
            delImg.setAttribute('onclick','deleteMain(\''+id+'\',\'kode\',\''+kode.value+'\')');
        } else {
            //alert(id);
            delImg.setAttribute('name','detail_delete_'+id);
            delImg.setAttribute('onclick','deleteDetail(\''+id+'\')');
        }
        delImg.setAttribute('src','images/delete_32.png');
    }
}

function fillField(nopp,tgl,kd_org,stat,statTgl,kd_jenisitem) 
{
        if(statTgl!='0')
        {
                if(stat==1)
                {
                        alert('This PR ('+nopp+') being on submission process');
                        return;
                }
                else if(stat==2)
                {
                        alert('This PR ('+nopp+') has been passed submission process');
                        return;
                }
        }
        else if(statTgl=='0')
        {
                document.getElementById('detailTable').style.display = 'block';
                document.getElementById('form_pp').style.display='block';
                document.getElementById('list_pp').style.display='none';
                document.getElementById('persetujuan').style.display='none';
                document.getElementById('dtl_pem').style.display='none';
                document.getElementById('method').value='update';
                document.getElementById('jenisitem').value=kd_jenisitem;
                document.getElementById('jenisitem').disabled=true;
                document.getElementById('nopp').value=nopp;
                document.getElementById('nopp').disabled=true;
                document.getElementById('kd_bag').disabled=true;
                document.getElementById('tgl_pp').value=tgl;
                document.getElementById('tgl_pp').disabled=true;
                document.getElementById('kd_bag').value=kd_org;
                //document.getElementById('dtl_pem').disabled=false;
                document.getElementById('tmbl_all').style.display = 'block';
                stat_input=1;
				stat_inputb=0;
                var kode = document.getElementById('nopp');
                param = "id="+kode.value;
                param += "&proses=createTable";

                function respon(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR\n' + con.responseText);
                                        } else {
                                                // Success Response
                                var detailDiv = document.getElementById('detailTable');
                                detailDiv.innerHTML = con.responseText;
                                document.getElementById('tmbl_all').innerHTML="<button class=mybutton onclick=frm_aju()>"+Done+"</button>";

                                        }
                                } else {
                                        busy_off();
                                        error_catch(con.status);
                                }
                        }
                }
                post_response_text('log_slave_pp_detail.php', param, respon);
        }
}
function cek_pembuat(nopp)
{
        rnop=nopp;
        //alert(rnop);
        param='rnopp='+rnop+'&method=cek_pembuat_pp';
        tujuan='log_slave_save_log_pp.php';
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
function delPp(rnopp,stat,statTgl)
{
        if(statTgl!=0)
        {
                if(stat==1)
                {
                        alert('No. PR' + rnopp + document.getElementById('alertsdgproses').value);
                        return;
                }
                else if(stat==2)
                {
                        alert('No. PR' + rnopp + document.getElementById('alertsdhproses').value);
                        return;
                }
        }
        else
        {
                        a=confirm(document.getElementById('alertqdelete').value);

                        if(a)
                        {
                                param='rnopp='+rnopp;
                                param+='&method=delete';
                                tujuan='log_slave_save_log_pp.php';
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
                                                                                document.getElementById('contain').innerHTML=con.responseText;
                                                                                alert('Deleted');
                                                                                clear_all_data();
                                                                                displayList();
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
                        else
                        {
                                displayList();
                        }

        }
}
function clear_all_data()
 {
        var cell = document.getElementById("detailTable");

        if ( cell.hasChildNodes() )
        {
                while ( cell.childNodes.length >= 1 )
                {
                cell.removeChild(cell.firstChild);       
                } 
        }
        document.getElementById("nopp").disabled=true;
        document.getElementById("nopp").value='';
        //document.getElementById("tgl_pp").value='';
        document.getElementById('detailTable').style.display = 'none';
        document.getElementById('tmbl_all').style.display = 'none';
        document.getElementById('kd_bag').value='';
        document.getElementById('tgl_pp').disabled=false;
        document.getElementById('kd_bag').disabled=false;
        document.getElementById('dtl_pem').disabled=false;
        document.getElementById('method').value='insert';
        document.getElementById('form_pp').style.display = 'none';
        document.getElementById('persetujuan').style.display = 'none';
        document.getElementById('list_pp').style.display = 'block';
        stat_inputb=0;
        stat_input=0;
        stat_inputc=0;
        document.getElementById('method').value='insert';
        //addDetail('detialPem');
 }



 function frm_ajun(nopp,stat){
		document.getElementById('list_pp').style.display='none';
		document.getElementById('form_pp').style.display='none';
		document.getElementById('persetujuan').style.display='block';
		param='rnopp='+nopp+'&method=formPersetujuan';
		tujuan='log_slave_save_log_pp.php';
		function respog(){
		  if(con.readyState==4){
			if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
					}
					else {
					   document.getElementById('persetujuandata').innerHTML=con.responseText;
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
 
 function alerteditdelete(){
	alert(document.getElementById('alertcannoteditdel').value);
	return;	 
 }
 
 stat_inputb=0;
function reset_data()
{
        op = document.getElementById('method');
        if(stat_inputb==0)
        {
                clear_all_data();
        }
        else if(stat_inputb==1)
        {
                rnopp = document.getElementById('detail_kode');
                rnopp = rnopp.value;
                param='rnopp='+rnopp;
                param+='&method=delete';
                tujuan='log_slave_save_log_pp.php';
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
                                                                //document.getElementById('contain').innerHTML=con.responseText;
                                                                //alert('Delete Data Succeed');
                                                                clear_all_data();
                                                                displayList();

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
}
function displayFormInput()
{
	clear_all_data();
	document.getElementById('method').value='insert';
	document.getElementById('form_pp').style.display='block';
	document.getElementById('dtl_pem').style.display='block';
	document.getElementById('list_pp').style.display='none';
	document.getElementById('tmbl_all').style.display='none';
	document.getElementById('jenisitem').disabled=false;
	document.getElementById('dtl_pem').disabled=true;
    stat_inputb=1;
}
function displayList()
{
        document.getElementById('form_pp').style.display='none';
        document.getElementById('list_pp').style.display='block';	
        document.getElementById('persetujuan').style.display='none';
        document.getElementById('txtsearch').value='';
        document.getElementById('tgl_cari').value='';
        stat_input=0;
        loadData();
}
function reset_data_setuju()
{
        document.getElementById('persetujuan').style.display = 'none';
        document.getElementById('form_pp').style.display = 'none';
        document.getElementById('fnopp').value='';
        document.getElementById('karywn_id').value='';
        document.getElementById('list_pp').style.display='block';
}
function save_persetujuan()
{
        nopp=trim(document.getElementById('fnopp').value);
        stat=trim(document.getElementById('cls_stat').value);
        kary=trim(document.getElementById('karywn_id').value);
        if(kary=='')
        {
                alert('Please verify  your selection');
        }
        else
        {
                method='insert_persetujuan';
                param='rnopp='+nopp+'&usr_id='+kary+'&method='+method+'&stat='+stat;
                tujuan='log_slave_save_log_pp.php';
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
                                                                        document.getElementById('contain').innerHTML=con.responseText;
                                                                        displayList();

                                                                }
                                                        }
                                                        else {
                                                                busy_off();
                                                                error_catch(con.status);
                                                        }
                                          }	
                         }
                         //post_response_text(tujuan, param, respog);
                        var answer =confirm('Are you sure?');
                        if (answer){
                        post_response_text(tujuan, param, respog);
                        }
                        else{
                        reset_data_setuju();
                        }
        }

}
function cariNopp()
{	
        document.getElementById('persetujuan').style.display='none';
        txtSearch=trim(document.getElementById('txtsearch').value);
        tglCari=trim(document.getElementById('tgl_cari').value);
        met=document.getElementById('method');
        met=met.value='cari_pp';
        met=trim(met);
        param='txtSearch='+txtSearch+'&tglCari='+tglCari+'&method='+met;
        tujuan='log_slave_get_user_id_log_pp.php';
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
                                                                document.getElementById('form_pp').style.display='none';
                                                                document.getElementById('list_pp').style.display='block';
                                                                document.getElementById('contain').innerHTML=con.responseText;
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
function cariData(num)
{
                document.getElementById('persetujuan').style.display='none';
                txtSearch=trim(document.getElementById('txtsearch').value);
                tglCari=trim(document.getElementById('tgl_cari').value);
                met=document.getElementById('method');
                met=met.value='cari_pp';
                met=trim(met);
                param='txtSearch='+txtSearch+'&tglCari='+tglCari+'&method='+met;
                param+='&page='+num;
                tujuan = 'log_slave_get_user_id_log_pp.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR\n' + con.responseText);
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
function loadEmployeeList()
{
        met=document.getElementById('method');
        met=met.value='cari_pp';
        param='method='+met;
        tujuan = 'log_slave_get_user_id_log_pp.php';
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
function loadData()
{
        param='method=refresh_data';
        tujuan = 'log_slave_save_log_pp.php';
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
                param='method=refresh_data';
                param+='&page='+num;
                tujuan = 'log_slave_save_log_pp.php';
                post_response_text(tujuan, param, respog);			
                function respog(){
                        if (con.readyState == 4) {
                                if (con.status == 200) {
                                        busy_off();
                                        if (!isSaveResponse(con.responseText)) {
                                                alert('ERROR\n' + con.responseText);
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
function detailAnggaran(kdbrg,thnangrn,unit)
{
    param='method=getAnggaran'+'&kdBarang='+kdbrg+'&thnAnggaran='+thnangrn+'&unit='+unit;
    tujuan = 'log_slave_save_log_pp.php';
    post_response_text(tujuan, param, respog);
    function respog(){
            if (con.readyState == 4) {
                    if (con.status == 200) {
                            busy_off();
                            if (!isSaveResponse(con.responseText)) {
                                    alert('ERROR\n' + con.responseText);
                            }
                            else {
                                    document.getElementById('dtFormDetail').innerHTML=con.responseText;
                            }
                    }
                    else {
                            busy_off();
                            error_catch(con.status);
                    }
            }
    }
}

function inserLink(title,content,ev){
	width='500';
	height='400';
	
	if(document.getElementById('url1_'+ev) == null) {
		url1 = '';
		url2 = '';
		url3 = '';
	} else {
		url1 = document.getElementById('url1_'+ev).value;
		url2 = document.getElementById('url2_'+ev).value;
		url3 = document.getElementById('url3_'+ev).value;
		
	}
	
	

	showDialog1(title,content,width,height,ev);
	document.getElementById('link1_'+ev).value = url1;
	document.getElementById('link2_'+ev).value = url2;
	document.getElementById('link3_'+ev).value = url3;
	
}

function saveLink(row){
	link1 = document.getElementById('link1_'+row).value;
	link2 = document.getElementById('link2_'+row).value;
	link3 = document.getElementById('link3_'+row).value;
	
	document.getElementById('url1_'+row).value = link1;
	document.getElementById('url2_'+row).value = link2;
	document.getElementById('url3_'+row).value = link3;
	closeDialog();
}

function imgitem(kdbrg,event){
	window.open("log_slave_save_log_pp_img.php?kodebarang="+kdbrg+'&method=image','winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=500,height=400");
}

function imglink(nopp,kdbrg,event){
	window.open("log_slave_save_log_pp_img.php?kodebarang="+kdbrg+'&method=linkpr&nopp='+nopp,'winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=500,height=400");
}

function imglink2(nopp,kdbrg,event){
	window.open("log_slave_save_log_pp_img.php?kodebarang="+kdbrg+'&method=linkpr2&nopp='+nopp,'winname',"directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=no,width=500,height=400");
}