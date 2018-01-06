/**
 * @author Developer Ekomoditi Solutions Indonesia
 */
function simpanGolongan()
{
	idgolongan = document.getElementById('idbp').value;
	kodegolongan=document.getElementById('kodegolongan').value;
	namagolongan=document.getElementById('namagolongan').value;
	met=document.getElementById('method').value;
	if(trim(kodegolongan)=='')
	{
		alert('Kode tiddak boleh kosong');
		document.getElementById('kodegolongan').focus();
	}
	else
	{
		idgolongan=trim(idgolongan);
		kodegolongan=trim(kodegolongan);
		namagolongan=trim(namagolongan);
		param='idgolongan='+idgolongan+'&kodegolongan='+kodegolongan+'&namagolongan='+namagolongan+'&method='+met;
		tujuan='sdm_slave_save_5jenisPengobatan.php';
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

function hapusGolongan(id)
{
	idgolongan=trim(id);
	param='idgolongan='+idgolongan+'&method=deletes';
	tujuan='sdm_slave_save_5jenisPengobatan.php';
	if(confirm("Anda yakin ingin menghapus data ini?"))
    {
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

function fillField(id, kode,nama)
{
	document.getElementById('kodegolongan').value=kode;
    //document.getElementById('kodegolongan').disabled=true;
	document.getElementById('namagolongan').value=nama;
	document.getElementById('method').value='update';
	document.getElementById('idbp').value=id;
}

function cancelGolongan()
{
    //document.getElementById('kodegolongan').disabled=false;
	document.getElementById('kodegolongan').value='';
	document.getElementById('namagolongan').value='';
	document.getElementById('method').value='insert';		
}

