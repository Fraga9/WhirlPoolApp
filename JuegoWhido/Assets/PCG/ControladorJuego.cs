using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ControladorJuego : MonoBehaviour
{
    [SerializeField] private float tiempoMaximo;
    [SerializeField] private Slider slider;
    private float tiempoActual;
    private bool tiempoActivado = false;
    [SerializeField] private GameObject pauseButton;
    [SerializeField] private GameObject pauseScreen;
    [SerializeField] private GameObject reportScreen;
    [SerializeField] private GameObject FinJuegoScreen;
    public int cantidadReportes = 0;
    [SerializeField] private Text anomaliasReportadasTXT;
    [SerializeField] private Text puntosObtenidosTXT;
    [SerializeField] private Text segundosTimerTXT;
    [SerializeField] private Text segundosPATXT;
    [SerializeField] private GameObject buttonsMov;
    


    private void Start()
    {
        ActivarTemporizador();
    }

    private void Update()
    {
        if(tiempoActivado)
        {
            CambiarContador();
        }
    }

    private void CambiarContador()
    {
        tiempoActual -= Time.deltaTime;
        if (tiempoActual >= 0)
        {
            slider.value = tiempoActual;
            int segundos = Mathf.FloorToInt(tiempoActual);
            segundosTimerTXT.text = segundos.ToString();
            segundosPATXT.text = "Tiempo restante: " + segundos.ToString() + " s";
        }

        if (tiempoActual <= 0)
        {
           Debug.Log("Se terminó el tiempo.");
           tiempoActivado = false;
           Time.timeScale = 0f;
           anomaliasReportadasTXT.text = "Anomalías reportadas: " + cantidadReportes;
           puntosObtenidosTXT.text = "Puntos obtenidos: " + cantidadReportes*10;
           FinJuegoScreen.SetActive(true);
        }
    }

    public void VerificarRespuesta(bool esRespuestaCorrecta)
    {
        if (esRespuestaCorrecta)
        {
            tiempoActual += 5f;
        }
        else
        {
            tiempoActual -= 5f;
        }
    }

    private void CambiarTemporizador(bool estado)
    {
        tiempoActivado = estado;
    }

    public void ActivarTemporizador()
    {
        tiempoActual = tiempoMaximo;
        slider.maxValue = tiempoMaximo;
        CambiarTemporizador(true);
    }

    public void DesactivarTemporizador()
    {
        CambiarTemporizador(false);
    }


    // buttons to show screens in the game
    public void Pausa()
    {
        Time.timeScale = 0f;
        pauseButton.SetActive(false);
        pauseScreen.SetActive(true);
    }

    public void Reanudar()
    {
        Time.timeScale = 1f;
        pauseButton.SetActive(true);
        pauseScreen.SetActive(false);
    }

    public void HideReportScreen()
    {
        reportScreen.SetActive(false);
        buttonsMov.SetActive(true);
    }
}