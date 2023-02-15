import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.get("/:id?", async ({ params }) => {
        return "it is working. The id is: " + params.id;
      })
        .where("id", Route.matchers.number())
        .as("show");

      Route.get("/topic/:topic", async ({ params }) => {
        return "it is working. The topic is: " + params.topic;
      }).as("topic");
    })
      .prefix("/attemps")
      .as("attemps");
  })
    .prefix("/v1")
    .as("v1");
})
  .prefix("/api")
  .as("api");
