/**
 * @author Developer
 */
function gantiLokasitugas()
{
	   tjbaru=document.getElementById('tjbaru').options[document.getElementById('tjbaru').selectedIndex].value;
       lokasibaru=document.getElementById('tjbaru').options[document.getElementById('tjbaru').selectedIndex].text;
		param='tjbaru='+tjbaru+'&lokasibaru='+lokasibaru;
		tujuan='setup_slave_save_pindahLokasi.php';
        //alert(param);
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
							alert(con.responseText);
							parent.window.location='logout.php';
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }
	 }
		
}
function tampillabel(kodeorg){
    //alert(namaorg);
    var kodeorg=kodeorg;
    param='kodeorg='+kodeorg;
    tujuan='setup_slave_tampil_Lokasi.php';
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
                            labelorg=con.responseText;
                            //alert(labelorg);
                            document.getElementById('lbl').innerHTML=labelorg;
							//parent.window.location='logout.php';
						}
					}
					else {
						busy_off();
						error_catch(con.status);
					}
		      }
	 }
}