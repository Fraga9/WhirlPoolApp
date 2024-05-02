using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Canva_Mov : MonoBehaviour
{
    public bool EsDerecha = false;
    public bool EsIzquierda = false;
    public bool EsArriba = false;
    public bool EsAbajo = false;
    public void ClickDerecho()
    {

        EsDerecha = true;
    }
    public void ReleaseDerecha()
    {
        EsDerecha = false;
    }
    public void ClickIzquierda()
    {
        EsIzquierda = true;
    }
    public void ReleaseIzquierda()
    {
        EsIzquierda = false;
    }
    public void ClickArriba()
    {
        EsArriba = true;
    }
    public void ReleaseArriba()
    {
        EsArriba = false;
    }
    public void ClickAbajo()
    {
        EsAbajo= true;
    }
    public void ReleaseAbajo()
    {
        EsAbajo = false;
    }
}
