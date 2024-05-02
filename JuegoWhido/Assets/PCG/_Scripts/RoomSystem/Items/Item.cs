using DG.Tweening;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class Item : MonoBehaviour
{
    [SerializeField]
    private SpriteRenderer spriteRenderer;
    [SerializeField]
    private BoxCollider2D itemCollider;

    [SerializeField]
    int health = 3;
    [SerializeField]
    bool nonDestructible;

    [SerializeField]
    private GameObject hitFeedback, destoyFeedback;

    [SerializeField]
    bool interactuable; // Esto es de prueba

    private Canvas canvas;
    private GameObject pantallaReporte;
    [SerializeField] private Sprite[] imagesToShow;
    private int randomIndex;
    private bool isPlayerNearby = false;
    private int reportesCount = 0;
    private Text contentTXT;
    Button interactuar;
    GameObject gm;
    Text respuestaTXT;
    [SerializeField] private float respuestaDuration = 0.25f; // Duración de la respuesta en segundos
    GameObject botonesMov;

    public UnityEvent OnGetHit { get => throw new System.NotImplementedException(); set => throw new System.NotImplementedException(); }

    void Start()
    {
        // Busca automáticamente el objeto Canvas en la jerarquía del juego
        canvas = FindObjectOfType<Canvas>();

        // Busca automáticamente el objeto PantallaReporte dentro del objeto Canvas
        if (canvas != null)
        {
            pantallaReporte = canvas.transform.Find("PantallaReporte").gameObject;

            GameObject repuestaObject = canvas.transform.Find("Respuesta").gameObject;
            respuestaTXT = repuestaObject.GetComponent<Text>();
            repuestaObject.SetActive(false);

            botonesMov = canvas.transform.Find("BotonesMov").gameObject;
            botonesMov.SetActive(true);

            if (pantallaReporte == null)
            {
                Debug.LogError("No se ha encontrado un objeto PantallaReporte dentro del Canvas.");
            }
            else
            {
                pantallaReporte.SetActive(false); // Desactiva la pantalla de reporte al inicio
            }

            Transform reportesTXT = canvas.transform.Find("ContadorAnomalias/Content");
            contentTXT = reportesTXT.GetComponent<Text>();

            Transform interactuarButton = canvas.transform.Find("InteractuarButton");
            interactuar = interactuarButton.GetComponent<Button>();
            interactuar.gameObject.SetActive(false);
        }

        gm = GameObject.Find("GameManager");
    }

    public void Initialize(ItemData itemData)
    {
        spriteRenderer.sprite = itemData.sprite;
        spriteRenderer.transform.localPosition = new Vector2(0.5f * itemData.size.x, 0.5f * itemData.size.y);
        itemCollider.size = itemData.size;
        itemCollider.offset = spriteRenderer.transform.localPosition;

        if (itemData.nonDestructible)
            nonDestructible = true;
        if (itemData.interactuable)
            interactuable = true;

        this.health = itemData.health;

    }

    public void GetHit(int damage, GameObject damageDealer)
    {
        if (nonDestructible)
            return;
        if(health>1)
            Instantiate(hitFeedback, spriteRenderer.transform.position, Quaternion.identity);
        else
            Instantiate(destoyFeedback, spriteRenderer.transform.position, Quaternion.identity);
        spriteRenderer.transform.DOShakePosition(0.2f, 0.3f, 75, 1, false, true).OnComplete(ReduceHealth);
    }

    private void ReduceHealth()
    {
        health--;
        if (health <= 0)
        {
            spriteRenderer.transform.DOComplete();
            Destroy(gameObject);
        }
            
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (interactuable && collision.CompareTag("Player"))
        {
            isPlayerNearby = true;
            interactuar.gameObject.SetActive(true);
        }
    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        if (interactuable && collision.CompareTag("Player"))
        {
            isPlayerNearby = false;
            botonesMov.SetActive(true);
            if (pantallaReporte != null)
            {
                pantallaReporte.SetActive(false); // Oculta la pantalla de reporte cuando el jugador se aleje
                interactuar.gameObject.SetActive(false);
            }
        }
    }

    void Update()
    {
        if (isPlayerNearby)
        {
            interactuar.onClick.AddListener(ShowImageAndUI);;
        }
    }

    private void ShowImageAndUI()
    {
        if (pantallaReporte != null)
        {
            botonesMov.SetActive(false);
            pantallaReporte.SetActive(true); // Muestra la pantalla de reporte cuando el jugador interactúa

            // Busca el panel dentro de la jerarquía de pantallaReporte
            Transform panelTransform = pantallaReporte.transform.Find("Fondo/Imagen/Image");

            if (panelTransform != null)
            {
                // Busca el componente de imagen dentro del panel encontrado
                UnityEngine.UI.Image imageUI = panelTransform.GetComponent<UnityEngine.UI.Image>();

                if (imageUI != null && imagesToShow.Length > 0)
                {
                    // Selecciona aleatoriamente una imagen del array y la muestra
                    randomIndex = UnityEngine.Random.Range(0, imagesToShow.Length);
                    Sprite randomSprite = imagesToShow[randomIndex];
                    imageUI.sprite = randomSprite;
                    imageUI.preserveAspect = true;
                }
            }

            // Obtener la transformación que contiene los botones
            Transform contentTransform = pantallaReporte.transform.Find("Fondo/Opciones/Scroll View/Viewport/Content");

            // Buscar todos los botones hijos dentro de la transformación
            Button[] buttons = contentTransform.GetComponentsInChildren<Button>();

            for (int i = 0; i < buttons.Length; i++)
            {
                int index = i;
                buttons[i].onClick.RemoveAllListeners(); // Limpiar cualquier función de clic anterior
                buttons[i].onClick.AddListener(() => ButtonClicked(index));
            }
        }
    }
    
    private void ButtonClicked(int index)
    {
        if (index == randomIndex)
        {
            Debug.Log("¡Correcto!");
            botonesMov.SetActive(true);
            respuestaTXT.color = Color.green; 
            respuestaTXT.text = "Correcto";
            respuestaTXT.gameObject.SetActive(true);
            respuestaTXT.DOFade(0f, respuestaDuration).SetDelay(respuestaDuration).OnComplete(() => respuestaTXT.gameObject.SetActive(false)); // Desvanecer el texto después de la duración especificada
            pantallaReporte.SetActive(false);
            gm.GetComponent<ControladorJuego>().cantidadReportes += 1;
            reportesCount = gm.GetComponent<ControladorJuego>().cantidadReportes;
            contentTXT.text = "Reportes: " + reportesCount.ToString();
            gm.GetComponent<ControladorJuego>().VerificarRespuesta(true);
            Destroy(gameObject);
        }
        else
        {
            Debug.Log("Incorrecto");
            respuestaTXT.color = Color.red; 
            respuestaTXT.text = "Incorrecto";
            respuestaTXT.DOFade(0f, respuestaDuration).SetDelay(respuestaDuration).OnComplete(() => respuestaTXT.gameObject.SetActive(false)); // Desvanecer el texto después de la duración especificada
            respuestaTXT.gameObject.SetActive(true);
            gm.GetComponent<ControladorJuego>().VerificarRespuesta(false);
        }
    }
}

