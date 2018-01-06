/* Function showNorma
 * Fungsi untuk pop up form norma
 * I : id table, primary key table
 * P : Ajax menyiapkan keseluruhan halaman norma
 * O : Halaman edit norma
 */
function showNorma(id,kodeorg,kodekegiatan,kelompok,namakegiatan,satuan) {  
  
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    showDialog1('Edit Norma',con.responseText,'800','300',event);
                    var dialog = document.getElementById('dynamic1');
                    dialog.style.top = '10%';
                    dialog.style.left = '15%';
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('setup_slave_kegiatan.php', param, respon);
}

/* Function getInv
 * Override dari zSearch.js
 * Fungsi untuk pop up window, untuk memilih barang
 * I : id target
 * O : Pop up window untuk pencarian barang
 */
function getInv(event,num) {
    var cont = "<fieldset><legend><b>Search</b></legend>";
    cont += "<input id='invSearch' type='text' onkeypress=\"if(getKey(event)==13){searchInv('invSearch','"+num+"');} else {return tanpa_kutip(event)}\" />";
    cont += "<img src='images/search.png' onclick=\"searchInv('invSearch','"+num+"')\" style='cursor:pointer'>";
    cont += "</fieldset>";
    
    cont += "<fieldset><legend><b>Result</b></legend><div id='sResult' style='height:315px;overflow:auto'>";
    cont += "</div></fieldset><input id='currNum' type='hidden' value='"+num+"' />";
    showDialog2('Search Inventory',cont,'500','400',event);
}

/* Function searchInv
 * Override dari zSearch.js
 * Fungsi untuk mencari barang
 * I : id search text, id target
 * O : Tampilkan hasil pencarian
 */

function ambilakun(){
    /* 
	noakun=document.getElementById('noakun').value;
    param="ngapain=ambilkegiatan";
    param+="&noakun="+noakun;
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    var res = document.getElementById('noakun');
                    res.value = con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }    
    post_response_text('setup_slave_kegiatan_kegiatan.php', param, respon);
	*/
	document.getElementById('noakun').value=document.getElementById('namaakun').value;
}

function searchInv(id,targetId) {
    var sText = document.getElementById(id);
    
    if(sText.value=='' || sText.value.length<3) {
        alert('Min 3 Char');
        exit;
    }
    
    var param = "keyword="+sText.value;
    param += "&target="+targetId;
    
    function respon() {
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    var res = document.getElementById('sResult');
                    res.innerHTML = con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('setup_slave_kegiatan_barang.php', param, respon);
}

/* Function passInvValue
 * Fungsi untuk mengirim nilai ke element tertentu
 * I : nilai, id target
 * O : nilai terupdate
 */
function passValue(kode,nama,satuan) {
    var num = document.getElementById('currNum').value;
    var tKode = document.getElementById('kodebarang_'+num);
    var tNama = document.getElementById('namabarang_'+num);
    var tSatuan = document.getElementById('uom1_'+num);
    
    tKode.value = kode;
    tNama.value = nama;
    tSatuan.innerHTML = satuan;
    closeDialog2();
}

/* Function addNewRow
 * Fungsi untuk menambah row baru ke dalam table
 * I : id dari tbody tabel
 * P : Persiapan row dalam bentuk HTML
 * O : Tambahan row pada akhir tabel (append)
 */
function addNewRow(body,primary,field) {
    var tabBody = document.getElementById(body);
    
    // Search Available numRow
    var numRow = 0;
    while(document.getElementById('detail_tr_'+numRow)) {
	numRow++;
    }
    
    // Add New Row
    var newRow = document.createElement("tr");
    tabBody.appendChild(newRow);
    newRow.setAttribute("id","detail_tr_"+numRow);
    newRow.setAttribute("class","rowcontent");
    
    var param = "proses=addRow";
    param += "&numRow="+numRow;
    param += "&primary="+primary;
    param += "&field="+field;
    
    function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
                    newRow.innerHTML = con.responseText;
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('setup_slave_kegiatan_norma.php', param, respon);
}

/* Function switchEditAdd
 * Fungsi untuk mengganti image add menjadi edit dan keroconya
 * I : id nomor row
 * P : Image Add menjadi Edit
 * O : Image Edit
 */
function switchEditAdd(id,primary,field,theme) {
    var idField = document.getElementById('addNorma_'+id);
    var delImg = document.getElementById('deleteNorma_'+id);
    var invBtn = document.getElementById('getInvBtn_'+id);
    var primaryJs = primary.split('##');
    primaryJs.push('namabarang');
    
    if(idField) {
        idField.removeAttribute('id');
        idField.removeAttribute('name');
        idField.removeAttribute('onclick');
        idField.removeAttribute('src');
        idField.removeAttribute('title');
        
	// Set Edit Image Attr
	idField.setAttribute('title','Edit');
	idField.setAttribute('id','editNorma_'+id);
	idField.setAttribute('name','editNorma_'+id);
	idField.setAttribute('onclick','editNorma(\''+id+'\',\''+primary+'\',\''+field+'\')');
        idField.setAttribute('src','images/'+theme+'/save.png');
	
	// Set Delete Image Attr
	delImg.setAttribute('class','zImgBtn');
        delImg.setAttribute('title','Hapus');
	delImg.setAttribute('name','deleteNorma_'+id);
	delImg.setAttribute('onclick','deleteNorma(\''+id+'\',\''+primary+'\',\''+field+'\')');
        delImg.setAttribute('src','images/'+theme+'/delete.png');
	
	// Disabled various field
	for(i=1;i<primaryJs.length;i++) {
	    tmp = document.getElementById(primaryJs[i]+'_'+id);
	    if(tmp) {
		tmp.setAttribute('disabled','disabled');
	    }
	}
	invBtn.setAttribute('disabled','disabled');
    } else {
        alert('DOM Definition Error');
    }
}

/* Function addNorma(id,field)
 * Fungsi untuk menambah data Detail
 * I : id row (urutan row pada table Detail), field yang berhubungan
 * P : Menambah data pada tabel Detail
 * O : Menambah baris pada tabel Detail
 */
function addNorma(id,primary,field) {
    var fieldJs = field.split('##');
    var kodeorg = document.getElementById('kodeorg_norma').value;
    var kodekegiatan = document.getElementById('kodekegiatan_norma').value;
    var kelompok = document.getElementById('kelompok_norma').value;
    
    param = "proses=add";
    param += "&kodeorg="+kodeorg;
    param += "&kodekegiatan="+kodekegiatan;
    param += "&kelompok="+kelompok;
    for(i=1;i<fieldJs.length;i++) {
        tmp = document.getElementById(fieldJs[i]+"_"+id);
        param += "&"+fieldJs[i]+"="+tmp.value;
    }
    
    function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
		    var theme = con.responseText;
                    switchEditAdd(id,primary,field,theme);
                    addNewRow('normaBody',primary,field);
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('setup_slave_kegiatan_norma.php', param, respon);
}

/* Function editNorma(id,primary,field)
 * Fungsi untuk mengubah data Detail
 * I : id row (urutan row pada table Detail),primary key, semua field
 * P : Mengubah data pada tabel Detail
 * O : Notifikasi data telah berubah
 */
function editNorma(id,primary,field) {
    var fieldJs = field.split('##');
    var primJs = primary.split('##');
    
    param = "proses=edit";
    param += "&primary="+primary;
    param += "&primVal=";
    for(i=1;i<primJs.length;i++) {
        tmp = document.getElementById(primJs[i]+"_norma");
        if(!tmp) {
            tmp = document.getElementById(primJs[i]+"_"+id);
        }
        param += "##"+tmp.value;
    }
    
    for(i=1;i<fieldJs.length;i++) {
        tmp = document.getElementById(fieldJs[i]+"_"+id);
        param += "&"+fieldJs[i]+"=";
        if(tmp.options) {
            param += tmp.options[tmp.options.selectedIndex].value;
        } else {
            param += tmp.value;
        }
    }
    
    function respon(){
        if (con.readyState == 4) {
            if (con.status == 200) {
                busy_off();
                if (!isSaveResponse(con.responseText)) {
                    alert('ERROR TRANSACTION,\n' + con.responseText);
                } else {
                    // Success Response
		    alert('Data Saved');
                }
            } else {
                busy_off();
                error_catch(con.status);
            }
        }
    }
    
    post_response_text('setup_slave_kegiatan_norma.php', param, respon);
}

/* Function deleteNorma(id,primary,field)
 * Fungsi untuk menghapus data norma
 * I : id row (urutan row pada table norma), primary field, semua field
 * P : Menghapus data pada tabel norma
 * O : Menghapus baris pada tabel norma
 */
function deleteNorma(id,primary,field) {
    var fieldJs = field.split('##');
    var primJs = primary.split('##');
    
    param = "proses=delete";
    param += "&primary="+primary;
    param += "&primVal=";
    for(i=1;i<primJs.length;i++) {
        tmp = document.getElementById(primJs[i]+"_norma");
        if(!tmp) {
            tmp = document.getElementById(primJs[i]+"_"+id);
        }
        param += "##"+tmp.value;
    }
    
    for(i=1;i<fieldJs.length;i++) {
        tmp = document.getElementById(fieldJs[i]+"_"+id);
        param += "&"+fieldJs[i]+"=";
        if(tmp.options) {
            param += tmp.options[tmp.selectedIndex].value;
        } else {
            param += tmp.value;
        }
    }
    
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
    
    post_response_text('setup_slave_kegiatan_norma.php', param, respon);
}

function loadData(){
	param  = 'proses=refresh_data';
	tujuan = 'setup_slave_kegiatan_norma.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		  if(con.readyState==4){
					if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
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

function cariBast(num){
		filter  = document.getElementById('filter').value;
		keyword = document.getElementById('keyword').value;

		param='proses=refresh_data';
		param+='&page='+num;
		param+='&filter='+filter+'&keyword='+keyword;

		tujuan = 'setup_slave_kegiatan_norma.php';
		post_response_text(tujuan, param, respog);
		function respog(){
				if (con.readyState == 4) {
					if (con.status == 200) {
							busy_off();
							if (!isSaveResponse(con.responseText)) {
									alert('ERROR\n' + con.responseText);
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

function baru(){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
}

function listdata(){
	location.reload(true);
}

function search(){
	filter  = document.getElementById('filter').value;
	keyword = document.getElementById('keyword').value;
	if(filter==''){
		document.getElementById('keyword').value='';
	}
	else {
		if(keyword=='') {
			alert(document.getElementById('findword').innerHTML + ' ' + document.getElementById('alertrequired').value);
		}
	}

	param='filter='+filter+'&keyword='+keyword+'&proses=refresh_data';
	tujuan = 'setup_slave_kegiatan_norma.php';
	post_response_text(tujuan, param, respog);
	function respog(){
		  if(con.readyState==4){
					if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
							alert('ERROR\n' + con.responseText);
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

function fillField(id,kodeorg,kodekegiatan,namakegiatan,kelompok,satuan,noakun,statuss){
	document.getElementById('form').style.display = '';
	document.getElementById('listdata').style.display = 'none';
	document.getElementById('proses').value='update';		
	document.getElementById('kodeorg').value=kodeorg;
	document.getElementById('noakun').value=noakun;
	document.getElementById('namaakun').value=noakun;
	document.getElementById('kodekegiatan').value=kodekegiatan;
	document.getElementById('kodekegiatan').disabled = true;
	document.getElementById('namakegiatan').value=namakegiatan;
	document.getElementById('kelompok').value=kelompok;
	document.getElementById('satuan').value=satuan;
	document.getElementById('status').value=statuss;
	document.getElementById('id').value=id;
}

function save(){
	kodeorg	 = trim(document.getElementById('kodeorg').value);
	namaakun = trim(document.getElementById('namaakun').value);	
	noakun	 = trim(document.getElementById('noakun').value);
	kodekegiatan = trim(document.getElementById('kodekegiatan').value);	
	namakegiatan = trim(document.getElementById('namakegiatan').value);	
	kelompok = trim(document.getElementById('kelompok').value);	
	satuan  = trim(document.getElementById('satuan').value);
	statuss = trim(document.getElementById('status').value);
	proses	= document.getElementById('proses').value;
	id	 	= document.getElementById('id').value;

	param='kodeorg='+kodeorg+'&kodekegiatan='+kodekegiatan+'&namakegiatan='+namakegiatan+'&kelompok='+kelompok+'&satuan='+satuan+'&statuss='+statuss+'&noakun='+noakun+'&proses='+proses+'&id='+id;
	tujuan='setup_slave_kegiatan_norma.php';

	if(kodeorg=='') {
		alert(document.getElementById('lbl_kodeorg').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(namaakun==''){
		alert(document.getElementById('lbl_namaakun').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(kodekegiatan==''){
		alert(document.getElementById('lbl_kodekegiatan').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(namakegiatan==''){
		alert(document.getElementById('lbl_namakegiatan').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}
	else if(kelompok==''){
		alert(document.getElementById('lbl_kelompok').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}	
	else if(statuss==''){
		alert(document.getElementById('lbl_status').innerHTML + ' ' + document.getElementById('alertrequired').value);
	}	
	else {
		if(confirm(document.getElementById('alertqinsert').value)){
		   post_response_text(tujuan, param, respog);
		}
	}

function respog(){
if(con.readyState==4){
		if (con.status == 200) {
						busy_off();
						if (!isSaveResponse(con.responseText)) {
								alert('ERROR\n' + con.responseText);
						}
						else {
							alert(con.responseText);
							location.reload(true);
						}
				}
				else {
						busy_off();
						error_catch(con.status);
				}
}
}
}

function del(id){
	param='id='+id+'&proses=delete';
	tujuan='setup_slave_kegiatan_norma.php';
	if(confirm(document.getElementById('alertqdelete').value)){
		post_response_text(tujuan, param, respog);
	}

	function respog(){
	if(con.readyState==4){
	if (con.status == 200) {
					busy_off();
					if (!isSaveResponse(con.responseText)) {
						alert('ERROR\n' + con.responseText);
					}
					else {
						alert(con.responseText);
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

function cancelKelSup(){
	location.reload(true);
}