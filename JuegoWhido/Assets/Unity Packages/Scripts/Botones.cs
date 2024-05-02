using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class Botones : MonoBehaviour
{
    
    public BotonesManager BM;
    void Awake()
    {
        BM = FindObjectOfType<BotonesManager>();
        if (BM == null)
        {
            Debug.LogError("No se encontró el script Canva_Mov en la escena.");
        }
    }
    public void Tirada()
    {

        SceneManager.LoadScene("Video");
        
    }
    public void GachaMenu()
    {
        SceneManager.LoadScene("MenuGacha");
    }
    public void Detalles()
    {
        SceneManager.LoadScene("Detalles");
    }
}
