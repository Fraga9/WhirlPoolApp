using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UI_Controller : MonoBehaviour
{
    public Text orbes;
    public Text wp;

    int numeroOrbes;
    int numPuntos;

    public void muestraPuntos()
    {
        int numWp = GameControl.Instance.GetCurrentWp();
        int numOrbes = GameControl.Instance.GetCurrentOrbs();
        wp.text = numWp.ToString() + "wp";
        orbes.text = numOrbes.ToString();
    }

    // Start is called before the first frame update
    void Start()
    {
        numeroOrbes = GameControl.Instance.numOrbes;
        numPuntos = GameControl.Instance.numWp;
        wp.text = numPuntos.ToString() + "wp";
        orbes.text = numeroOrbes.ToString();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

}
