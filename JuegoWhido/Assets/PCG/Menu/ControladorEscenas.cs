using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ControladorEscenas : MonoBehaviour
{
    // Buttons to change scenes
    public void IniciarJuego()
    {
        SceneManager.LoadScene("Juego");
    }

    public void RegresarMenu()
    {
        SceneManager.LoadScene("Menu");
    }

    public void IrTienda()
    {
        SceneManager.LoadScene("Tienda");
    }

    public void IrAlmacen()
    {
        SceneManager.LoadScene("MenuGacha");
    }

    public void SalirDelJuego()
    {
        // Salir de la aplicación
        Application.Quit();

        // Este código solo se ejecutará en el editor de Unity.
        #if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
        #endif
    }
}
