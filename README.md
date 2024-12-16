# Analiza timpului de dezvoltare și dimensiunii fisierelor după compilarea unei aplicații web frontend pentru dezvoltare clasică vs stiluri arhitecturale


## 1. Introducere:

In cadrul acestui proiect dorim sa construim 2 aplicatii identice folosind ReactJS + NextJS. Intr-una dintre aplicatii vom folosi Design Patterns, iar in cealalta nu.
Scopul final al proiectului este sa comparam durata de dezvoltare si dimensiunea finala a proiectului dupa etapa de build.

Am plecat de la un schelet de aplicatie deja existent pentru a nu incepe aplicatia de la 0.

## 2. Metodologie

Aplicatia consta in implemnetarea unui Frontend pentru CRM simplu ce gestioneaza biletele de la evenimente. Toate datele sunt fictivie, prelucrate ca si cum ar veni din Backend.

Pentru aplicatai ce utilizeaza Design Patterns am avut in vedere sa folosim unele dintre cele mai utilizate modele din industrie pentru partea de ReactJS precum Custom Hooks Pattern, Higher-Order Components, etc.

Nu am ales sa comparam si performanta aplicatiilor deoarece diferente sunt insesizabile, iar cat despre memoria RAM folosita, si aceasta este insesizabila ca diferenta intre cele doua, mai ales ca este vorba despre o aplicatie simpla.

## 3. Analiza modelelor de proiectare:

În lumea dezvoltării frontend cu React, aplicarea modelelor de design a devenit o practică esențială. Aceste modele au evoluat în conformitate cu nevoile specifice ale React, oferind soluții elegante la provocările recurente cu care se confruntă dezvoltatorii atunci când proiectează componente și aplicații robuste.

Dupa cum putea vedea si pe website-ul celor de la <a href="https://baguilar6174.medium.com/react-design-patterns-6ab55c5ebafb"> Medium</a>, modelele folosite in ReactJS sunt indispensabile.

### High Order Component

Modelul Higher Order Component (HOC) este o tehnică de compoziție în React care este utilizată pentru a reutiliza logica între componente. Un HOC este o funcție care preia o componentă și returnează o componentă nouă cu funcționalitate suplimentară sau extinsă.

Exemplu:
```javascript
import React, { ComponentType, useState } from 'react';

interface FormValues {
  [key: string]: string;
}

interface WithFormProps {
  onSubmit: (values: FormValues) => void;
}

// HOC that handles form state and logic
function withForm<T extends WithFormProps>(WrappedComponent: ComponentType<T>) {
  const WithForm: React.FC<T> = (props) => {
    const [formValues, setFormValues] = useState<FormValues>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      props.onSubmit(formValues);
    };

    return (
      <WrappedComponent
        {...props}
        formValues={formValues}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    );
  };

  return WithForm;
}

// Component that uses the HOC to manage a form.
interface MyFormProps extends WithFormProps {
  formValues: FormValues;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyForm: React.FC<MyFormProps> = ({ formValues, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={formValues.name || ''} onChange={onInputChange} />
      <input type="text" name="email" value={formValues.email || ''} onChange={onInputChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

// Using the HOC to wrap the MyForm component
const FormWithLogic = withForm(MyForm);

// Main component that renders the form
const App: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values);
    // Logic to send the form data to the server
  };

  return (
    <div>
      <h1>HOC Form</h1>
      <FormWithLogic onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
```

### Custom Hook Pattern

Modelul Custom Hook din React este o tehnică care permite încapsularea logicii unei componente într-o funcție reutilizabilă. Custom Hook-urile sunt funcții JavaScript care utilizează Hook-urile furnizate de React (cum ar fi useState, useEffect, useContext etc.) și pot fi partajate între componente pentru a încapsula și reutiliza în mod eficient logica.

Exemplu:

```javascript
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
};

function useFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic, if necessary
    };
  }, [url]);

  return { data, loading, error };
}

// Using the Custom Hook on a component
function ExampleComponent() {
  const { data, loading, error } = useFetch<{ /* Expected data type */ }>('https://example.com/api/data');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data.</div>;
  }

  return (
    <div>
      {/* Rendering of the obtained data */}
    </div>
  );
}

export default ExampleComponent;
```

### Control Props Pattern

Modelul Control Props este o tehnică din React care permite unei componente să-și controleze starea internă prin elementele de recuzită furnizate de componenta părinte. În loc ca componenta să-și gestioneze propria stare intern, aceasta delegă controlul asupra stării componentei părinte prin elemente de recuzită, permițând părintelui să manipuleze și să controleze starea componentei copil după cum este necesar.

Exemplu:
```javascript
import React, { useState } from 'react';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => {
  const handleClick = () => {
    onChange(!value);
  };

  return (
    <button onClick={handleClick}>
      {value ? 'On' : 'Off'}
    </button>
  );
};

// Usage of the Toggle component controlled by props
const Example: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = (value: boolean) => {
    setIsToggled(value);
  };

  return (
    <div>
      <h1>Control Props Example</h1>
      <Toggle value={isToggled} onChange={handleToggleChange} />
      <p>The current state is: {isToggled ? 'On' : 'Off'}</p>
    </div>
  );
};

export default Example;
```

## 4. Eficiența și Optimizarea

Toate Design Patterns folosite contribuie semnificativ la optimizarea factorilor de comparatie pe care ii avem. High Order Component afecteaza foarte mult numarul de linii de cod din fisier, deoarece ne ajuta sa reutilizam majoritatea componentelor. Custom Hooks Pattern ne ajuta foarte mult la timpul de dezvoltare, deoarece starile aplicatiei sunt mult mai usor de gestionat fata de un cod Javascript simplu, iar Control Props Pattern este cel mai adecvat pattern pentru a face legatura intre HOC si Custom Hooks, fiind intr-un fel calea de mijloc pentru gestionarea componentelor reutilziate.

## 5. Studiu Comparativ

Inca de la inceput ne-am propus sa comparam doua aplicatii pentru a vedea daca utilizarea de Design Patterns afecteaza sau nu timpul de dezvoltare si dimensiunea fisierelor dupa procesul de build.

Dimensiunea fisierelor este foarte importanta cand vine vorba despre aplicatii de Frontend deoarece aceasta afecteaza foarte mult experienta utilizatorului pe un website sau intr-o aplicatie. Daca dimensiunea fisierelor este mare, si durata de incarcare si implicit de interactiune va fi mai mare. Daca pentru o viteza de internet mare, aceasta diferenta este greu de sesizat, cand vine vorba de viteza de internet pe dispozitivele mobile sau in locuri mai retrase, aceasta diferenta poate fi se de cateva secunde.

In urma rezultatelor noastr de pana acum (urmeaza sa continuam) am ajuns la un timp de dezvoltare de 4.5 ore pentru varianta cu utilizarea Design Patterns, si 10 ore pentru neutilizarea acestora. Este destul de neintuitiv (greu de dezvoltat) fara Design Pattern-urile principale din React, deoarece netuilizarea acestora ar aduce aplicatia catre un stadiu de Javascript simplu.

Cat despre diferenta dintre dimensiunile fisierelor de dupa procesul de build, aceasta nu este atat de mare, fiind vorba doar despre 3MB diferenta (171MB vs 174MB), in favoarea (cea mai mica valaore) pentru neutilizarea pattern-urilor. Aceasta diferenta sigur se va modifica pana la sfarsitul proiectului. Chiar daca dimensiunea este mai mica pentru neutilizarea modelelor, timpul mai mult decat dublu de dezvoltare pe care il necesita este un factor semnificativ ce ne recomanda sa utilizatm Design Patterns cand vine voroba despre dezvoltarea aplicatiilor de ReactJS + NextJS.

