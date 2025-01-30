import { APIGatewayProxyHandler } from "aws-lambda";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch tasks
export const fetchTasks: APIGatewayProxyHandler = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch tasks", error }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// Create task
export const createTask: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body!);
  const { title, description, deadline, priority, assigned_to } = body;

  const { data, error } = await supabase.from("tasks").insert([
    { title, description, deadline, priority, assigned_to },
  ]);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create task", error }),
    };
  }
  return {
    statusCode: 201,
    body: JSON.stringify(data),
  };
};

// Update task
export const updateTask: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body!);
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update task", error }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

// Delete task
export const deleteTask: APIGatewayProxyHandler = async (event) => {
  const { id } = JSON.parse(event.body!);

  const { data, error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to delete task", error }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
