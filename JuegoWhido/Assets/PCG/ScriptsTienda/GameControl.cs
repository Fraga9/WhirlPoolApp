using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameControl : MonoBehaviour
{

    public int numOrbes = 0; //tiene que venir de la BD
    public int numWp = 200; //tiene que venir de la BD

    static public GameControl Instance;

    public UI_Controller UI_Controller;


    public void Awake()
    {
        StopAllCoroutines();
        PlayerPrefs.SetInt("orbes", numOrbes); //tal vez se tenga que cambiar por cómo viene en su "historial" o en la BD
        PlayerPrefs.SetInt("wp", numWp);
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(this.gameObject);
            Instance.SetReferences();
            DontDestroyOnLoad(this.gameObject);
        }

        
    }

    void SetReferences()
    {
        if (UI_Controller == null)
        {
            UI_Controller.FindObjectOfType<UI_Controller>();
            
        }
        
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public int GetCurrentOrbs()
    {
        return PlayerPrefs.GetInt("orbes", numOrbes);
    }

    public int GetCurrentWp()
    {
        return PlayerPrefs.GetInt("wp", numWp);
    }

    void compraUno()
    {
        int nuevoWp = GetCurrentWp() - 20;
        int nuevoOrbes = GetCurrentOrbs() + 1;
        PlayerPrefs.SetInt("orbes", nuevoOrbes);
        PlayerPrefs.SetInt("wp", nuevoWp);
        UI_Controller.muestraPuntos();
    }

    void compraDos()
    {
        int nuevoWp = GetCurrentWp() - 90;
        int nuevoOrbes = GetCurrentOrbs() + 5;
        PlayerPrefs.SetInt("orbes", nuevoOrbes);
        PlayerPrefs.SetInt("wp", nuevoWp);
        UI_Controller.muestraPuntos();
    }
    
    void compraTres()
    {
        int nuevoWp = GetCurrentWp() - 150;
        int nuevoOrbes = GetCurrentOrbs() + 10;
        PlayerPrefs.SetInt("orbes", nuevoOrbes);
        PlayerPrefs.SetInt("wp", nuevoWp);
        UI_Controller.muestraPuntos();
    }

/* Falta linkearlo a la BD para que pueda ganarse al personaje que corresponda y relacionarlo con descripción, nombre, y aquí le damos imagen y precio.
    public void compraCuatro()
    {
        
    }

    public void compraCinco()
    {
        
    }
    */

    void Regresar()
    {
        //hacer el comando para cambiar de escena, como no tengo la escena, no puedo
    }
}
