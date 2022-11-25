import { createPinia } from "pinia";
const pinia = createPinia();

pinia.use(({ store }) => {
  // if (store) {
  //   store.$onAction(({ name, args, after, onError }) => {
  //     console.log(
  //       `%c 🍍 Event Name: ${name}`,
  //       "background: #fff; color: #bada55"
  //     );
  //     const startTime = Date.now();
  //     console.log(
  //       `%c 🍍 Start: '${name}' with params [${args.join(", ")}].`,
  //       "background: #fff; color: #bada55"
  //     );
  //     after((result) => {
  //       console.log(
  //         `%c 🍍 Finished: '${name}' after ${
  //           Date.now() - startTime
  //         }ms.\nResult: ${result}.`,
  //         "background: #fff; color: #bada55"
  //       );
  //     });
  //     onError((error) => {
  //       console.log(
  //         `%c 🍍 Failed "${name}" after ${
  //           Date.now() - startTime
  //         }ms.\nError: ${error}.`,
  //         "background: red; color: white"
  //       );
  //     });
  //   });
  // }
});

export default pinia;
