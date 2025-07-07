# Утечки памяти

Этот файл фиксирует реальные проблемы с утечками памяти, найденные в проекте **The Sandworms**, и документирует пути их решения.

---

## Общий подход и инструменты

| Шаг | Инструмент / команда                               | Цель                                            |
| --- | -------------------------------------------------- |-------------------------------------------------|
| 1   | Chrome DevTools → **Performance** → 30‑сек запись  | Отслеживаем рост JS Heap                        |
| 2   | Chrome DevTools → **Memory** → Allocation sampling | Ищем оторванные DOM‑узлы и удерживаемые объекты |


## Утечка №1 — «залипающие» слушатели событий `mousemove`

### Симптомы

* После каждой паузы/перезапуска цикла игры объём heap возрастал ≈ 3–5 КБ. График памяти рос «ступеньками» при повторном входе на экран игры.
* В DevTools вкладка **Event Listeners** показывала рост количества `mousemove`‑слушателей на `document`.

### Причина

Слушатель `mousemove` добавлялся в `useEffect`, зависевшем от `gameState`, но не удалялся в cleanup. Каждый новый запуск цикла создавал дополнительный обработчик.

### Исправление

```diff
 const onMouseMove = (e: MouseEvent) => {
   mouse.x = e.clientX;
   mouse.y = e.clientY;
 };
 document.addEventListener('mousemove', onMouseMove);
-
+return () => {
+  document.removeEventListener('mousemove', onMouseMove);
+};
```

* Теперь при размонтировании эффекта (изменение `gameState` или уход со страницы) обработчик корректно снимается, счётчик слушателей стабилен.

---

## Утечка №2 — Создание `Image()` внутри рендера

### Симптомы

* При каждом рендере компонента создавались новые экземпляры `HTMLImageElement`. В Allocation sampling виднелись десятки «Detached HTMLImageElement».
* Длительная сессия (10+мин) приводила к росту heap > 10 МБ и скачкам GPU‑памяти.

### Причина

`new Image()` вызывался прямо в теле хука `useSnakeGame`, т.е. при каждой перерисовке, даже если `src` оставался тем же.

```tsx
// ПЛОХО: выполняется каждый рендер
const playerFace = new Image();
playerFace.src = playerFaceUrl;
```

### Исправление

1. Создали ref‑контейнеры `playerFaceRef` / `botFaceRef` и `bgPatternRef`.
2. Переместили создание картинок в `useEffect(() => { … }, [])`, который выполняется ровно один раз.
3. В `draw*` функциях берём изображение из `*.current`.

```tsx
const playerFaceRef = useRef<HTMLImageElement | null>(null);

useEffect(() => {
  const img = new Image();
  img.src   = playerFaceUrl;
  img.onload = () => (playerFaceRef.current = img);
}, []);
```

* После правки heap остаётся ровным, Allocation‑профиль показывает единственные активные объекты `HTMLImageElement`.

---

## Ссылки

* [https://react.dev/learn/optimizing-performance#avoiding-memory-leaks](https://react.dev/learn/optimizing-performance#avoiding-memory-leaks)
* Chrome DevTools → Memory Docs
