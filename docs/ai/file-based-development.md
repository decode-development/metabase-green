---
<<<<<<< HEAD
title: Agent-driven development
summary: "Use an agent with skills to create Metabase content on your local machine as YAML files, then upload the files to your Metabase."
||||||| 0a60f2436f
title: File-based development
summary: "Use a combination of agent skills, the Metabase MCP server, and serialization to develop Metabase content with agents on your local file system."
=======
title: Agent-driven development
summary: "Use a coding agent and the Metabase CLI to create Metabase content, then version that content as YAML files with Remote Sync."
>>>>>>> v0.62.1
---

# Agent-driven development

{% include plans-blockquote.html feature="Agent-driven development" %}

<<<<<<< HEAD
Metabase content like questions and dashboards can be serialized as YAML files. You can edit those YAML files by hand, sure, but now that we have actual genies, you can just ask them to edit them for you (call it "lamp-rubbing development").
||||||| 0a60f2436f
Metabase content like questions and dashboards can be serialized as YAML files. You can edit those YAML files directly, but the most productive workflow is to let an agent do the editing for you — this article focuses on that agent-driven workflow.
=======
Now that we have actual genies, you can just ask the genies to create the content for you (call it "lamp-rubbing development").
>>>>>>> v0.62.1

<<<<<<< HEAD
Paired with some skills we've developed, you can export your Metabase as YAML files, ask your agent to create new questions and dashboards YAML files, then import that new content into your Metabase. It's a whole new way to work with Metabase.
||||||| 0a60f2436f
## The file-based toolkit
=======
Give an agent the [Metabase CLI](../installation-and-operation/metabase-cli.md), and it can create content for you. But since LLMs can be unpredictable, we recommend developing content in a dev instance of Metabase, then using [Remote Sync](../installation-and-operation/remote-sync.md) to get your changes into production.
>>>>>>> v0.62.1

<<<<<<< HEAD
## The agent-driven development toolkit
||||||| 0a60f2436f
We provide a set of tools for using an AI agent to create and edit Metabase content [serialized](../installation-and-operation/serialization.md) as YAML files.
=======
With this set up, a typical workflow using an agent with a development instance of Metabase would be:
>>>>>>> v0.62.1

<<<<<<< HEAD
To develop your Metabase content on your local filesystem, we've put together a set of tools, including a set of agent skills.
||||||| 0a60f2436f
- The [Metabase Representation Format](https://github.com/metabase/representations). This is a directory that includes a spec, schemas, and examples for all Metabase entities as YAML files: questions, dashboards, and so on.
- The [`metabase-representation-format` agent skill](https://github.com/metabase/agent-skills) for working with these YAML files.
- CLI commands and API endpoints to export and import content serialized in YAML.
- [MCP server](./mcp.md) to look up database metadata when creating the YAML files.
=======
1. Prompt the agent with `/metabase-cli Create a dashboard based on the sales table.`
2. Agent creates questions and a dashboard.
3. View the dashboard in your dev instance.
4. Iterate either in your Metabase or via the agent until you're happy with the dashboard.
5. Use Remote Sync to push your changes to a repo.
6. Create a PR.
7. Merge the changes.
8. Once merged, your production Metabase pulls in the changes via Remote Sync.
>>>>>>> v0.62.1

<<<<<<< HEAD
- [**Metabase Representation Format**](https://github.com/metabase/representations): the YAML schema and spec for every Metabase entity (questions, dashboards, collections, transforms, and so on).
- **[Metabase Database Metadata Format](https://github.com/metabase/database-metadata)**: diff-friendly representations of synced databases, their tables, and their fields, as a tree of YAML files.
- **Export and Import** CLI and API endpoints to move serialized content between your local files and Metabase.
- [**Remote Sync**](../installation-and-operation/remote-sync.md) (Optional): push content from a Read-write Metabase into a git repo, and pull it into a Read-only Metabase in production.

## How content moves between files and Metabase

You'll need a way to get YAML files out of Metabase to edit and back into Metabase to verify and ship. There are two options:

- **[Remote Sync](../installation-and-operation/remote-sync.md)** — push and pull from inside Metabase. Requires a Read-write development instance and a Read-only production instance.
- **Serialization API** — `curl`-based export and import against the `/api/ee/serialization/` endpoints.

Pick one before you start the [Initial setup](#initial-setup); the setup steps differ slightly (Remote Sync doesn't need a separate API key in production).

## Initial setup

Some things to put into place to get a workflow going:

1. [Set up a development Metabase](#set-up-a-development-metabase)
2. [Set up a repository to version your YAML files](#set-up-a-repository-to-version-your-yaml-files)
3. [Add agent skills to your repository](#add-agent-skills-to-your-repository)
4. [Download the database metadata](#download-the-database-metadata)

Once you have these set up, you can step through one of the example workflows.
||||||| 0a60f2436f
## Prerequisites
=======
## The agent-driven development toolkit

To develop your Metabase content with an agent, we've put together a set of tools.

- A Metabase instance to use for development.
- [**Metabase CLI**](../installation-and-operation/metabase-cli.md): a command-line client (`mb`) your agent uses to create content directly in your Metabase. Use the CLI with the [`/metabase-cli` skill](https://github.com/metabase/agent-skills/tree/main/skills/metabase-cli).
- [**Metabase Representation Format**](https://github.com/metabase/representations): the YAML schema and spec for every Metabase entity (questions, dashboards, collections, transforms, and so on). This is the format your content takes once you version it as files.
- [**Remote Sync**](../installation-and-operation/remote-sync.md): push content from a Read-write Metabase into a git repo, and pull it into a Read-only Metabase in production.

## Initial setup

Some things to put into place to get a workflow going:

1. [Set up a development Metabase](#set-up-a-development-metabase)
2. [Set up a repository to version your YAML files](#set-up-a-repository-to-version-your-yaml-files)
3. [Install and authenticate the Metabase CLI](#install-and-authenticate-the-metabase-cli)
4. [Add the agent skill](#add-the-agent-skill)

Once you have these set up, you can step through the example workflow.
>>>>>>> v0.62.1

### Set up a development Metabase

<<<<<<< HEAD
1. Set up a Metabase instance to check your work before pushing changes to production. This Metabase should connect to the same data warehouse(s) your production Metabase connects to. A [config file](../configuring-metabase/config-file.md) will come in handy here.

2. Create an [API key](../people-and-groups/api-keys.md#create-an-api-key) and assign it to the Admin group. The skills export and import all content and read database metadata, so they need Admin-level access. If you're using the [Serialization API workflow](#how-content-moves-between-files-and-metabase), you'll also need to create an API key in your production Metabase so you can import your files into it.

3. We also recommend turning off the sample content and usage analytics, so they don't pollute the data model. If you're using a [docker compose file](../installation-and-operation/running-metabase-on-docker.md), add these [environment variables](../configuring-metabase/environment-variables.md):
||||||| 0a60f2436f
Set up a Metabase instance to check your work before pushing changes to production. This Metabase should connect to the same data warehouse(s) your production Metabase connects to. A [config file](../configuring-metabase/config-file.md) will come in handy here.
=======
1. Set up a Metabase instance to check your work before pushing changes to production. This Metabase should connect to the same data warehouse(s) your production Metabase connects to. A [config file](../configuring-metabase/config-file.md) will come in handy here.
>>>>>>> v0.62.1

<<<<<<< HEAD
||||||| 0a60f2436f
We also recommend turning off the sample content and usage analytics, so they don't pollute the data model. If you're using a [docker compose file](../installation-and-operation/running-metabase-on-docker.md), add these [environment variables](../configuring-metabase/environment-variables.md):
=======
2. Create an [API key](../people-and-groups/api-keys.md#create-an-api-key) in this development Metabase and assign it to the Admin group, so the agent can create content and work with Remote Sync.

3. We also recommend turning off the sample content and usage analytics, so they don't pollute the data model. If you're using a [docker compose file](../installation-and-operation/running-metabase-on-docker.md), add these [environment variables](../configuring-metabase/environment-variables.md):
>>>>>>> v0.62.1

```
MB_LOAD_SAMPLE_CONTENT: "false"
MB_INSTALL_ANALYTICS_DATABASE: "false"
```

### Set up a repository to version your YAML files

<<<<<<< HEAD
1. Initialize a new repo.
2. Add a `.gitignore` file and add `.metabase/` and `.env`.
3. Add the following to your `.env`:
||||||| 0a60f2436f
If you want an agent to do the editing, you also need:

1. **The `metabase-representation-format` skill added to your agent** so the agent understands the YAML schemas. See [Agent skills](https://github.com/metabase/agent-skills).

2. **Your agent connected to your Metabase's MCP server**, so it can look up database metadata (table names, fields, and sample values) when writing questions and dashboards. The MCP server exposes tools like `search`, `get_table`, and `get_table_field_values`. See [MCP server](./mcp.md).

## Example agent-driven workflow

Here's an example workflow for using an agent to create Metabase content as YAML on your local machine, then importing that content into your development and production Metabases.

### 1. Create a git repo

Initialize a git repo with a README.md and an initial commit.

### 2. Check out a branch

Create a new branch to track your work.
=======
Create a new git repository for your Metabase content. You'll point Remote Sync at this repo when you configure it, and clone the repo locally to review changes and open pull requests.

### Install and authenticate the Metabase CLI

Install the [Metabase CLI](../installation-and-operation/metabase-cli.md) globally:
>>>>>>> v0.62.1

```
<<<<<<< HEAD
   METABASE_URL={your-metabase-url}
   METABASE_API_KEY={your-api-key}
||||||| 0a60f2436f
git checkout -b your-branch-name
=======
npm install -g @metabase/cli
>>>>>>> v0.62.1
```

<<<<<<< HEAD
### Add agent skills to your repository

You should add the following skills to your agent so it has context it needs. If you commit the skills into `.claude/skills/` in your repo, for example, Claude loads them automatically whenever you run it from that directory.

- [**`metabase-representation-format` agent skill**](https://github.com/metabase/agent-skills/blob/main/skills/metabase-representation-format/SKILL.md): teaches the agent the representation format and ships the schema checker.
- [**`metabase-database-metadata` agent skill**](https://github.com/metabase/agent-skills/blob/main/skills/metabase-database-metadata/SKILL.md): fetches database metadata from your Metabase into an on-disk YAML tree the agent can read while editing.
- [**`metabase-semantic-checker` agent skill**](https://github.com/metabase/agent-skills/blob/main/skills/metabase-semantic-checker/SKILL.md) (optional): runs Metabase's semantic checker in Docker to catch referential and query errors the schema check doesn't.

### Download the database metadata

Invoke the `metabase-database-metadata` skill and ask your agent to fetch the database metadata. The agent will:

- Check that `.env` exists. If it doesn't, the agent will prompt you to create it.
- Verify that `.env` and `.metabase/` are in `.gitignore`, asking before adding them.
- Fetch `/api/database/metadata` into `.metabase/metadata.json` (raw API response; can be several GB on large warehouses).
- Extract a diff-friendly YAML tree to `.metabase/databases/<database>/schemas/<schema>/tables/<table>.yaml` by running `npx @metabase/database-metadata extract-metadata`.

The agent can use the YAML extracted to your `.metabase` directory while creating and editing new questions and dashboards in YAML. That way your agent can refer to real column names, field types, and foreign-key relationships without making live API calls (which would be much slower).

To refresh this database metadata, just ask your agent to re-fetch it.

## Example workflows

The workflows below both assume you've completed the [Initial setup](#initial-setup).

### Example prompts

Once your repo has the agent skills and a baseline of content, prompt the agent with a structured request:
||||||| 0a60f2436f
### 3. Export your production Metabase

Always export before editing YAML files locally. If someone has updated a dashboard or question in the Metabase UI since your last export, and you edit and import stale local files, the import will overwrite those in-app changes. Re-export at the start of each editing session if the app may have changed since your last export.

Your agent will also read these serialized YAML files to find info about existing content, so the agent can know what you mean when you ask it to "add the new question to the Handsome collection."

To export your Metabase:

1. Create an [API key](../people-and-groups/api-keys.md).
2. Assign the key to the Admin group.
3. Send a `curl` request to export data:

   ```sh
   curl \
     -H 'X-API-Key: YOUR_API_KEY' \
     -X POST 'https://your-metabase-url/api/ee/serialization/export?data_model=false' \
     -o metabase_data.tgz
   ```

   substituting `YOUR_API_KEY` with your API key and `your-metabase-url` with the URL of your Metabase instance.

   Be sure to set the `data_model=false` query parameter excludes the data model from the export, since the data model payload can be large. Instead, your agent will use the MCP server to search for the metadata it needs to generate the YAML files. See [Serialization](../installation-and-operation/serialization.md) for other export options.

   This command will download the files as a GZIP-compressed Tar file named `metabase_data.tgz`.

4. Extract the archive:

   ```sh
   tar -xzf metabase_data.tgz
   ```

Instead of running this `curl` by hand every time, you can ask your agent to generate an `export.sh` script that wraps the `curl` and the `tar -xzf` extraction, so you can re-export with a single command.

### 4. Commit the export

Commit the initial exported set of YAML files. If your AI goes off the rails, you can always revert to the original export.

### 5. Use AI to edit or create new content

Change into the directory with your serialized files and ask your agent to create whatever you want. Make sure your agent actually invokes the skills, otherwise the agent may not get the YAML format right.

Example prompt:
=======
Then authenticate it against your development Metabase:
>>>>>>> v0.62.1

```
<<<<<<< HEAD
Use the metabase-representation-format and metabase-database-metadata skills to create new YAML files in this directory:

1. Create a new dashboard called "Support overview" in collections/main/.
2. Add questions showing total ticket volume, open tickets, and average satisfaction rating.
||||||| 0a60f2436f
Use the metabase-representation-format skill and the Metabase MCP server to do the following by editing the YAML files in this directory:

1. Create a new collection called "File-based collection".
2. Create a new dashboard called "AI-created dashboard", saved to that collection.
3. Create a question called "AI counts products" that counts the number of products by category.
4. Add that question to the "AI-created dashboard".
=======
mb auth login --url your-metabase-url-here
>>>>>>> v0.62.1
```

<<<<<<< HEAD
Or, depending on how capable your model is, try a more open-ended request:
||||||| 0a60f2436f
Depending on how sophisticated your AI model is, you can also try more ambitious, open-ended requests:
=======
Authenticate with the API key you created in your Metabase instance.

### Add the agent skill

Add the [`/metabase-cli` skill](https://github.com/metabase/agent-skills/tree/main/skills/metabase-cli) to your agent so it knows how to use the CLI to create content directly in your Metabase.

## Example prompts

These examples assume you've completed the [Initial setup](#initial-setup). Run the `/metabase-cli` skill and give the agent a structured request. The agent will run CLI commands to create the content directly in your development Metabase:
>>>>>>> v0.62.1

```
<<<<<<< HEAD
Use the metabase-representation-format and metabase-database-metadata skills to analyze our support data. Look at the tickets, customers, and interactions tables, and create a dashboard that gives an overview of our team's support workload.
||||||| 0a60f2436f
Use the metabase-representation-format skill and the Metabase MCP server to analyze the data in the sample postgresql
database. Look at the orders, people, reviews, and products tables.

Create a dashboard with some questions that gives an overview of how the business is doing.
=======
/metabase-cli Create a new dashboard called "Support overview". Add questions showing total ticket volume, open tickets, and average satisfaction rating.
>>>>>>> v0.62.1
```

<<<<<<< HEAD
The agent will read the representation format spec, check existing files for local conventions, consult `.metabase/databases/` for real column names, and write new YAML.

## Example workflow with Remote Sync

### 1. Configure Remote Sync on both instances

In your development Metabase, configure [Remote Sync in Read-write mode](../installation-and-operation/remote-sync.md#setting-up-remote-sync) pointed at your repo. In production, configure a second Metabase in Read-only mode pointed at the same repo.

### 2. Create a branch from the Metabase UI

Switch branches in Metabase, as the Metabase UI is the source of truth for which branch the development instance pushes to and pulls from.

In your development Metabase, click the **branch dropdown** at the top and [create a new branch](../installation-and-operation/remote-sync.md#creating-a-branch) for your work, like `feature/support-dashboard`.

### 3. Push existing content to seed the repo

Click the up arrow (**push**) icon to [commit and push](../installation-and-operation/remote-sync.md#committing-and-pushing-your-changes) your existing synced collections to the branch.

### 4. Clone the repo locally and check out the branch

```sh
git clone your-metabase-repo
cd your-metabase-repo
git checkout feature/support-dashboard
```

### 5. Ask the agent to edit or create content

See [Example prompts](#example-prompts) above for prompt patterns to use here.

### 6. Validate the YAML files

Run the [schema check](#schema-check) after every batch of edits, and optionally run the [semantic check](#semantic-checker-for-deeper-validation) at the end of the session. See [Validating YAML files](#validating-yaml-files) below.
||||||| 0a60f2436f
### 6. Validate the YAML files

Before importing, check your YAML files against the representation schemas. The `metabase-representation-format` skill should have the agent run the validator for you, but you can also run it yourself:
=======
Or, depending on how capable your model is, try a more open-ended request:
>>>>>>> v0.62.1

If anything fails, the agent should be able to fix the issue if you give it the error.

### 7. Commit and open a pull request

```sh
git add -A
git commit -m "Add support-overview dashboard"
git push origin feature/support-dashboard
```
<<<<<<< HEAD

Open a pull request so your team can review the YAML diff.

### 8. Pull the branch into your development Metabase

Click the **pull** (down arrow) icon in your development Metabase to load the agent's changes. Verify the dashboard renders correctly and the questions return expected results.

### 9. Merge the PR so production picks up the changes

If you've enabled [auto-sync](../installation-and-operation/remote-sync.md#pulling-changes-automatically), your production Metabase (in Read-only mode) will pull the new main branch automatically on its next interval. Otherwise, trigger a pull from production manually.

## Example workflow with import and export endpoints

### 1. Clone the empty repo and create a branch

```sh
git clone https://github.com/your-org/your-repo.git
cd your-repo
git checkout -b feature/support-dashboard
```

### 2. Export existing content to seed the repo

The agent does better work when the repo already holds your current Metabase content, so it can see real examples of the Representation Format and your collection conventions. Run the [serialization export](../installation-and-operation/serialization.md#serialization-workflow-example) from inside the clone:

```sh
curl \
  -H 'X-API-Key: YOUR_API_KEY' \
  -X POST 'https://your-metabase-url/api/ee/serialization/export?data_model=false' \
  -o metabase_data.tgz
tar -xzf metabase_data.tgz
```

Set `data_model=false` to keep the export small. The agent should get its metadata from the `metabase-database-metadata` skill instead. For more on export options, see [Serialization](../installation-and-operation/serialization.md).

Commit the extracted YAML so you have a baseline to revert to if the agent goes off the rails.

### 3. Ask the agent to edit or create content

See [Example prompts](#example-prompts) above for prompt patterns to use here.

### 4. Validate the YAML files

Run the [schema check](#schema-check) after every batch of edits, and optionally run the [semantic check](#semantic-checker-for-deeper-validation) at the end of the session. See [Validating YAML files](#validating-yaml-files) below.

### 5. Commit and open a pull request

```sh
git add -A
git commit -m "Add support-overview dashboard"
git push origin feature/support-dashboard
```

Then open open a pull request so your team can review the YAML diff.

### 6. Import the YAML into your development Metabase

Re-bundle the YAML and import it:

```sh
tar -czf metabase_data.tgz metabase_data
curl -X POST \
  -H 'X-API-Key: YOUR_API_KEY' \
  -F 'file=@metabase_data.tgz' \
  'https://your-metabase-url/api/ee/serialization/import' \
  -o -
```

The `-o -` flag writes the import response to stdout, so you can see whether the import succeeded and check any warnings. You can ask the agent to generate `export.sh` and `import.sh` wrappers so you're running a single command each time.

Verify the dashboard renders correctly and the questions return expected results.

### 7. Repeat the import against production

Once you're confident in the changes, run the same `tar` + `curl` import against your production Metabase, using its API key.

## Undoing the agent's changes

If you want to undo the agent's changes, use `git` to revert your YAML files to the last known-good commit before pushing or re-importing.

If you're using Remote Sync, don't try to fix things by re-pushing from Metabase: Metabase's push only reflects its current state and won't delete any new files the agent created locally.

## Validating YAML files

Run both checks locally before pushing. The same checks belong in CI — see [CI example](#ci-example) below.

### Schema check

You can run a quick schema check:

```sh
npx --yes @metabase/representations validate-schema
||||||| 0a60f2436f
npx --yes @metabase/representations validate-schema
=======
/metabase-cli Analyze our support data. Look at the tickets, customers, and interactions tables, and build a dashboard that gives an overview of our team's support workload.
>>>>>>> v0.62.1
```

<<<<<<< HEAD
The check validates the shape of every YAML file against the Representation Format spec. The `metabase-representation-format` skill should run this check for you automatically after the agent makes any edits.

### Semantic checker for deeper validation

> The semantic checker is only available in the Pro/Enterprise plans.

The **semantic checker** catches things like references to tables that don't exist or columns the agent invented.

What it validates beyond schema:

- Cross-entity references: `collection_id`, `dashboard_id`, `parent_id`, snippet names, transform tags, card embeddings.
- MBQL query compilation: `source-table`, field references, joins, segments, measures, expressions.
- Native-query references: tables, columns, and snippets named in SQL.

If you've installed the `metabase-semantic-checker` skill, just ask the agent to run the semantic checker; the skill picks the right image, passes the right flags, and summarizes the findings.

You can manually run the semantic checker via Docker like so:

```sh
docker pull metabase/metabase-enterprise:latest

docker run --rm \
  -v "$PWD:/workspace" \
  --entrypoint "" \
  -w /app \
  metabase/metabase-enterprise:latest \
  java -jar metabase.jar \
    --mode checker \
    --export /workspace \
    --schema-dir /workspace/.metabase/metadata.json \
    --schema-format concise
```

Match the image tag (`:latest`) to your Metabase build.

### CI example

You can hook the schema check into GitHub Actions so your team catches problems on the PR, before anyone pulls the changes into Metabase:
||||||| 0a60f2436f
You can also set up a workflow to run the validator on pull requests. Here's an example, saved to `.github/workflows/schema-check.yml`:
=======
The agent writes the CLI commands and creates the questions and dashboard for you—just describe what you want.
>>>>>>> v0.62.1

<<<<<<< HEAD
```yaml
# .github/workflows/schema-check.yml
name: Schema Check
||||||| 0a60f2436f
```yaml
name: Schema Check
=======
## Example workflow
>>>>>>> v0.62.1

### 1. Configure Remote Sync on both Metabase instances

In your development Metabase, configure [Remote Sync in Read-write mode](../installation-and-operation/remote-sync.md#setting-up-remote-sync) pointed at your repo.

Set up Remote Sync in your production Metabase in Read-only mode pointed at the same repo.

### 2. Create a branch from the Metabase UI

<<<<<<< HEAD
For the semantic check, add a second workflow that fetches `.metabase/metadata.json` from your Metabase and then runs the Docker command above against the checkout. If you run the semantic check in more than one workflow (for example, a semantic check and per-PR preview environments), you should probably factor the database metadata fetch to run and cache once a day so you don't hit the API on every push.

## Deleting content

Since imports and exports _don't_ delete content, you'll need to delete content in the Metabase application itself, then update the YAML files as well.

1. Delete the content in your production Metabase (in the app's UI).
2. Push (with Remote Sync) or re-export (without) so the change is reflected in the repo.
3. Commit the deletion. That way Metabase won't recreate the deleted items the next time it pulls.
||||||| 0a60f2436f
That way your team catches schema issues on the PR, before anyone imports the changes into Metabase.

### 7. Import the changes to your development Metabase

Import your changes to your development Metabase, and check that the import works and the content is as expected.

First, compress your directory of YAML files:

```
tar -czf metabase_data.tgz metabase_data
```

Then import that compressed file:

```
curl -X POST \
  -H 'X-API-Key: YOUR_API_KEY' \
  -F 'file=@metabase_data.tgz' \
  'https://your-metabase-url/api/ee/serialization/import' \
  -o -
```

The `-o -` flag writes the import response to stdout, so you can see whether the import succeeded and check any warnings.

Just like with export, you can ask your agent to generate an `import.sh` script that handles the `tar -czf` compression and the `curl` in one shot.

Log in to this Metabase and check that the changes are as you expect.

#### Did your AI go off the rails?

If you want to undo the agent's changes, use `git` to revert your YAML files to the last known-good commit. Don't try to undo the changes by re-exporting from your production Metabase: re-exporting will overwrite edits you made to existing files, but it _won't_ delete any new files the agent created, so your directory will still contain those unwanted files.

### 8. Commit your changes

If all looks good, commit your changes. If you get any errors, give the error info to the agent in the same session and the agent should iron out any issues.

### 9. Import to your production Metabase

Import your changes via the API, push your changes to a remote git repository and set up [remote sync](../installation-and-operation/remote-sync.md) so that your production instance pulls in the changes automatically.

## Deleting content

Since imports and exports _don't_ delete content, you'll need to delete that content in the Metabase application itself, then update the YAML files as well.

1. Delete the content in your production Metabase (in the app's UI itself).
2. Export from your production Metabase to your repo.
3. Commit the changes so that the YAML files are updated. That way Metabase won't recreate the deleted items the next time you import your changes.
=======
Switch branches in Metabase, as the Metabase UI is the source of truth for which branch the development instance pushes to and pulls from.

In your development Metabase, click the **branch dropdown** at the top and [create a new branch](../installation-and-operation/remote-sync.md#creating-a-branch) for your work, like `feature/support-dashboard`.

### 3. Ask the agent to create content

Run the `/metabase-cli` skill and prompt the agent to build your questions and dashboards. The agent creates the content directly in your development Metabase.

### 4. Verify the content in your development Metabase

Open your development Metabase and confirm the dashboard renders correctly and the questions return expected results. Make any changes you want, either in the UI or via the agent.

### 5. If you make any changes in your Metabase, push the new content to the branch

To commit the work, [push the change from your Metabase](../installation-and-operation/remote-sync.md#committing-and-pushing-your-changes). If you don't push your changes from your Metabase to your repo, you could lose work the next time you pull changes into that Metabase.

### 6. Open a pull request

Open a pull request so your team can review the YAML diff. They can also use Remote Sync to pull the branch into a development Metabase and see the changes live.

### 7. Merge the PR so production picks up the changes

If you've enabled [auto-sync](../installation-and-operation/remote-sync.md#pulling-changes-automatically), your production Metabase (in Read-only mode) will pull the new main branch automatically on its next interval.

## Undoing the agent's changes

Since the agent uses the CLI to create content directly in Metabase, to undo changes, you could either:

- **Revert to a commit and pull changes**: Revert to a previous commit, and pull that commit into your Metabase. Pulling that commit would overwrite any changes you or the agent had made.
- **Update Metabase and push changes**: Edit or archive the content in your Metabase (either manually or via an agent with the CLI), and push the changes to your repo. You may want to pick this approach if you want to keep some, but not all of the changes made by the AI, or if you've made additional changes via Metabase's handy UI that you want to keep.
>>>>>>> v0.62.1

## Further reading

<<<<<<< HEAD
- [Remote Sync](../installation-and-operation/remote-sync.md)
- [Serialization](../installation-and-operation/serialization.md)
- [Metabase Representation Format](https://github.com/metabase/representations)
- [Metabase Database Metadata Format](https://github.com/metabase/database-metadata)
||||||| 0a60f2436f
- [MCP server](./mcp.md)
- [Serialization](../installation-and-operation/serialization.md)
=======
- [Remote Sync](../installation-and-operation/remote-sync.md)
- [Metabase CLI](../installation-and-operation/metabase-cli.md)
- [Metabase Representation Format](https://github.com/metabase/representations)
>>>>>>> v0.62.1
- [Agent skills](https://github.com/metabase/agent-skills)
<<<<<<< HEAD
- [MCP server](./mcp.md) — for agents that need live metadata lookups outside the file-based workflow.
||||||| 0a60f2436f
=======
- [MCP server](./mcp.md): for agents that need live metadata lookups outside the file-based workflow.
>>>>>>> v0.62.1
